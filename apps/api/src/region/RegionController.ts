import type { Request, Response } from "express";
import type {
	RegionCreateInput,
	RegionUpdateInput,
} from "node_modules/@uptime/db/prisma/generated/models";
import type { RegionService } from "./RegionService";

export class RegionController {
	constructor(private readonly regionService: RegionService) {}

	public createRegion = async (req: Request, res: Response) => {
		const region = await this.regionService.createRegion(
			req.body as RegionCreateInput,
		);
		res.status(201).json(region);
	};

	public getRegions = async (_req: Request, res: Response) => {
		const regions = await this.regionService.getRegions();
		res.status(200).json(regions);
	};

	public getRegionById = async (req: Request, res: Response) => {
		const region = await this.regionService.getRegionById(
			req.params.id as string,
		);

		if (!region) {
			res.status(404).json({ message: "Region not found" });
			return;
		}

		res.status(200).json(region);
	};

	public updateRegion = async (req: Request, res: Response) => {
		const region = await this.regionService.updateRegion(
			req.params.id as string,
			req.body as RegionUpdateInput,
		);
		res.status(200).json(region);
	};

	public deleteRegion = async (req: Request, res: Response) => {
		const region = await this.regionService.deleteRegion(
			req.params.id as string,
		);
		res.status(200).json(region);
	};
}
