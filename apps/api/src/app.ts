import { globalErrorHandler } from "@/middlewares/globalErrorHandler";
import { loggerMiddleware } from "@/middlewares/logger";
import { v1Router } from "@/routes/v1";
import { auth } from "@uptime/auth";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import "dotenv/config";
import type { Express } from "express";
import express from "express";

const app: Express = express();

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];

app
	.disable("x-powered-by")

	.use(
		cors({
			origin: allowedOrigins,
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
	.all("/api/auth/*splat", (req, res) => {
		const origin = req.headers.origin;

		if (allowedOrigins.includes(origin!)) {
			res.header("Access-Control-Allow-Origin", origin);
		}

		res.header("Access-Control-Allow-Credentials", "true");
		res.header(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization, Access-Control-Allow-Origin",
		);
		res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");

		if (req.method === "OPTIONS") {
			return res.sendStatus(200);
		}

		return toNodeHandler(auth)(req, res);
	}) //  For ExpressJS v5

	// Mount express json middleware after Better Auth handler
	// or only apply it to routes that don't interact with Better Auth
	.use(express.json())

	.use(express.urlencoded({ extended: true }))

	.use(loggerMiddleware)

	.get("/", (_req, res) => {
		res.send("Uptime API");
	})

	.get("/health", (_req, res) => {
		res.send("OK");
	})

	.get("/error", () => {
		throw new Error("Test error");
	})

	.use("/api/v1", v1Router)

	.get("/api/me", async (req, res) => {
		const session = await auth.api.getSession({
			headers: fromNodeHeaders(req.headers),
		});
		return res.json(session);
	})

	.use(globalErrorHandler);

export default app;
