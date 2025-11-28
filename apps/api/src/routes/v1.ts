import { monitorRouter } from "@/monitor/monitor-router";
import { regionRouter } from "@/region/region-router";
import { Router } from "express";

const v1Router: Router = Router();

v1Router.use("/regions", regionRouter);
v1Router.use("/monitors", monitorRouter);

export { v1Router };
