import { validate } from "@/middlewares/validation";
import { handler } from "@/utils";
import { Router } from "express";
import { RegionController } from "./RegionController";
import { RegionService } from "./RegionService";
import { regionSchema } from "./region-schema";

const regionRouter: Router = Router();
const regionService = new RegionService();
const regionController = new RegionController(regionService);

regionRouter.post(
	"/",
	validate(regionSchema),
	handler(regionController.createRegion),
);

regionRouter.get("/", handler(regionController.getRegions));

regionRouter.get("/:id", handler(regionController.getRegionById));

regionRouter.patch(
	"/:id",
	validate(regionSchema.partial()),
	handler(regionController.updateRegion),
);

regionRouter.delete("/:id", handler(regionController.deleteRegion));

export { regionRouter };
