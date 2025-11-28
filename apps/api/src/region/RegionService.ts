import db from "@uptime/db";
import type {
	RegionCreateInput,
	RegionUpdateInput,
} from "node_modules/@uptime/db/prisma/generated/models";
export class RegionService {
	public async createRegion(region: RegionCreateInput) {
		return await db.region.create({
			data: region,
		});
	}

	public async getRegions() {
		return await db.region.findMany();
	}

	public async getRegionById(id: string) {
		return await db.region.findUnique({
			where: { id },
		});
	}

	public async updateRegion(id: string, region: RegionUpdateInput) {
		return await db.region.update({
			where: { id },
			data: region,
		});
	}

	public async deleteRegion(id: string) {
		return await db.region.delete({
			where: { id },
		});
	}
}
