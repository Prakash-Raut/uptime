import type Logger from "@uptime/logger";
import type { Request, Response } from "express";
import type { MonitorService } from "./MonitorService";
import { createMonitorSchema, monitorUpdateSchema } from "./monitor-schema";

export class MonitorController {
	constructor(
		private readonly monitorService: MonitorService,
		private logger: typeof Logger,
	) {}

	public createMonitor = async (req: Request, res: Response) => {
		const validation = createMonitorSchema.safeParse(req.body);
		if (!validation.success) {
			return res.status(400).json({ message: validation.error.message });
		}
		const userId = req.user.id;
		const { name, url, frequency } = validation.data;

		const monitor = await this.monitorService.createMonitor(userId, {
			name,
			url,
			frequency,
		});

		this.logger.info({ id: monitor.id }, "Monitor created successfully");
		res.status(201).json(monitor);
	};

	public getMonitors = async (req: Request, res: Response) => {
		const userId = req.user.id;
		const { page = 1, pageSize = 10, search = "" } = req.query;

		const monitors = await this.monitorService.getMonitors(
			userId,
			+page,
			+pageSize,
			search as string,
		);

		this.logger.info("Monitors fetched successfully");
		res.status(200).json(monitors);
	};

	public getMonitorById = async (req: Request, res: Response) => {
		const userId = req.user.id;
		const monitorId = req.params.id as string;

		const monitor = await this.monitorService.getMonitorById(userId, monitorId);

		if (!monitor) {
			this.logger.error({ id: monitorId }, "Monitor not found");
			return res.status(404).json({ message: "Monitor not found" });
		}

		this.logger.info({ id: monitor.id }, "Monitor fetched successfully");
		res.status(200).json(monitor);
	};

	public updateMonitor = async (req: Request, res: Response) => {
		const validation = monitorUpdateSchema.safeParse(req.body);
		if (!validation.success) {
			this.logger.error(
				{ errors: validation.error.flatten().fieldErrors },
				"Invalid monitor update data",
			);
			return res
				.status(400)
				.json({ errors: validation.error.flatten().fieldErrors });
		}

		const userId = req.user.id;
		const monitorId = req.params.id as string;

		const { name, url, frequency } = validation.data;

		const monitor = await this.monitorService.updateMonitor(userId, monitorId, {
			name,
			url,
			frequency,
		});

		this.logger.info({ id: monitor.id }, "Monitor updated successfully");
		res.status(200).json(monitor);
	};

	public deleteMonitor = async (req: Request, res: Response) => {
		const userId = req.user.id;
		const monitorId = req.params.id as string;

		await this.monitorService.deleteMonitor(userId, monitorId);

		this.logger.info({ id: monitorId }, "Monitor deleted successfully");
		res.status(200).json({ message: "Monitor deleted successfully" });
	};

	public getMonitorStatus = async (req: Request, res: Response) => {
		const userId = req.user.id;
		const monitorId = req.params.id as string;

		const { currentStatus, lastCheckedAt, currentlyUpSince, incidents } =
			await this.monitorService.getMonitorStatus(userId, monitorId);

		this.logger.info({ id: monitorId }, "Monitor status fetched successfully");
		res
			.status(200)
			.json({ currentStatus, lastCheckedAt, currentlyUpSince, incidents });
	};
}
