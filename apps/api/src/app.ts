import { globalErrorHandler } from "@/middlewares/globalErrorHandler";
import { loggerMiddleware } from "@/middlewares/logger";
import { v1Router } from "@/routes/v1";
import { auth } from "@uptime/auth";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import "dotenv/config";
import type { Express } from "express";
import express from "express";

export const createExpressServer = (): Express => {
	const app = express();

	app
		.disable("x-powered-by")

		// cors middleware
		.use(
			cors({
				origin: "*", // for testing purposes
				methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
				allowedHeaders: [
					"Content-Type",
					"Authorization",
					"Access-Control-Allow-Origin",
				],
				credentials: true,
			}),
		)

		// better auth handler
		.all("/api/auth/*splat", toNodeHandler(auth)) //  For ExpressJS v5

		// Mount express json middleware after Better Auth handler
		// or only apply it to routes that don't interact with Better Auth
		.use(express.json())

		// logger middleware
		.use(loggerMiddleware)

		.get("/", (_req, res) => {
			res.send("Uptime API");
		})

		// health check
		.get("/health", (_req, res) => {
			res.send("OK");
		})

		// error test route
		.get("/error", () => {
			throw new Error("Test error");
		})

		// v1 router
		.use("/api/v1", v1Router)

		.get("/api/me", async (req, res) => {
			const session = await auth.api.getSession({
				headers: fromNodeHeaders(req.headers),
			});
			return res.json(session);
		})

		// global error handler
		.use(globalErrorHandler);

	return app;
};
