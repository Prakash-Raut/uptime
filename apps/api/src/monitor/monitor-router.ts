import { requireAuth } from "@/middlewares/auth";
import { validate } from "@/middlewares/validation";
import { handler } from "@/utils";
import logger from "@uptime/logger";
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { MonitorController } from "./MonitorController";
import { MonitorService } from "./MonitorService";
import { monitorSchema } from "./monitor-schema";

const monitorRouter: Router = Router();
const monitorService = new MonitorService();
const monitorController = new MonitorController(monitorService, logger);

const monitorLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 min
	max: 5,
	message: {
		success: false,
		error: "Too many attempts, try again soon.",
	},
});

monitorRouter.use(requireAuth);

monitorRouter.post(
	"/",
	monitorLimiter,
	validate(monitorSchema),
	handler(monitorController.createMonitor),
);

monitorRouter.get("/", handler(monitorController.getMonitors));

monitorRouter.get("/:id", handler(monitorController.getMonitorById));

monitorRouter.patch(
	"/:id",
	monitorLimiter,
	validate(monitorSchema.partial()),
	handler(monitorController.updateMonitor),
);

monitorRouter.delete("/:id", handler(monitorController.deleteMonitor));

monitorRouter.get("/:id/status", handler(monitorController.getMonitorStatus));

export { monitorRouter };
