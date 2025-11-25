import db from "@uptime/db";
import type { StatusPageModel } from "node_modules/@uptime/db/prisma/generated/models";
import type { StatusPageCreateInput, StatusPageUpdateInput } from "./schema";

export class StatusPageService {
	public async createStatusPage(
		userId: string,
		statusPage: StatusPageCreateInput,
	): Promise<StatusPageModel> {
		return await db.statusPage.create({
			data: {
				...statusPage,
				userId: userId,
			},
		});
	}

	public async getStatusPages(
		userId: string,
		page: number,
		pageSize: number,
	): Promise<StatusPageModel[]> {
		return await db.statusPage.findMany({
			where: {
				userId: userId,
			},
			take: pageSize,
			skip: (page - 1) * pageSize,
			orderBy: {
				updatedAt: "desc",
			},
		});
	}

	public async getStatusPageById(
		userId: string,
		id: string,
	): Promise<StatusPageModel | null> {
		return await db.statusPage.findUnique({
			where: {
				id: id,
				userId: userId,
			},
		});
	}

	public async updateStatusPage(
		userId: string,
		id: string,
		statusPage: StatusPageUpdateInput,
	): Promise<StatusPageModel> {
		return await db.statusPage.update({
			where: {
				id: id,
				userId: userId,
			},
			data: statusPage,
		});
	}

	public async deleteStatusPage(
		userId: string,
		id: string,
	): Promise<{ id: string }> {
		return await db.statusPage.delete({
			where: {
				id: id,
				userId: userId,
			},
			select: {
				id: true,
			},
		});
	}
}
