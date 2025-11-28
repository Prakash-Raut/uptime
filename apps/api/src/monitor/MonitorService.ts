import db from "@uptime/db";
import type { MonitorStatus } from "node_modules/@uptime/db/prisma/generated/enums";
import type { MonitorModel } from "node_modules/@uptime/db/prisma/generated/models";
import type { MonitorCreateInput, MonitorUpdateInput } from "./monitor-schema";

export class MonitorService {
	public async createMonitor(
		userId: string,
		monitor: MonitorCreateInput,
	): Promise<MonitorModel> {
		return await db.monitor.create({
			data: {
				...monitor,
				userId: userId,
			},
		});
	}

	public async getMonitors(
		userId: string,
		page: number,
		pageSize: number,
		search: string,
	): Promise<MonitorModel[]> {
		return await db.monitor.findMany({
			skip: (page - 1) * pageSize,
			take: pageSize,
			where: {
				url: { contains: search, mode: "insensitive" },
				userId: userId,
			},
		});
	}

	public async getMonitorById(userId: string, id: string) {
		return await db.monitor.findUnique({
			where: { id, userId: userId },
		});
	}

	public async updateMonitor(
		userId: string,
		id: string,
		monitor: MonitorUpdateInput,
	): Promise<MonitorModel> {
		return await db.monitor.update({
			where: { id, userId: userId },
			data: monitor,
		});
	}

	public async deleteMonitor(
		userId: string,
		id: string,
	): Promise<{ id: string }> {
		return await db.monitor.delete({
			where: { id, userId: userId },
			select: {
				id: true,
			},
		});
	}

	public async getMonitorStatus(
		userId: string,
		monitorId: string,
	): Promise<{
		currentStatus: MonitorStatus;
		lastCheckedAt: Date;
		currentlyUpSince: Date;
		incidents: number;
	}> {
		const monitor = await db.monitor.findUnique({
			where: { id: monitorId, userId: userId },
			select: { id: true, createdAt: true },
		});

		if (!monitor) {
			throw new Error("Monitor not found");
		}

		const [latestTick, lastDownEvent, incidents] = await Promise.all([
			db.tick.findFirst({
				where: { monitorId: monitorId },
				orderBy: { createdAt: "desc" },
				take: 1,
			}),
			db.tick.findFirst({
				where: { monitorId: monitorId, status: "DOWN" },
				orderBy: { createdAt: "desc" },
			}),
			db.tick.count({
				where: { monitorId: monitorId, status: "DOWN" },
			}),
		]);

		if (!latestTick) {
			throw new Error("No ticks found");
		}

		const currentStatus = latestTick.status;

		let upSince: Date; // The date the monitor was last up

		if (lastDownEvent) {
			// Get the FIRST UP tick after the last DOWN
			const firstUpAfterDown = await db.tick.findFirst({
				where: {
					monitorId: monitorId,
					status: "UP",
					createdAt: { gt: lastDownEvent.createdAt },
				},
				orderBy: { createdAt: "asc" },
			});

			// If no UP event after DOWN → site is currently down
			if (currentStatus === "UP") {
				upSince = firstUpAfterDown?.createdAt ?? lastDownEvent.createdAt;
			} else {
				upSince = lastDownEvent.createdAt;
			}
		} else {
			// fallback: since the monitor was created
			upSince = monitor.createdAt;
		}

		return {
			currentStatus,
			lastCheckedAt: latestTick.createdAt,
			currentlyUpSince: upSince,
			incidents,
		};
	}
}
