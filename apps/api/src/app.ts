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

const allowedOrigins = [
	"http://localhost:3001",
	"https://uptime-web-six.vercel.app",
];

app
	.disable("x-powered-by")

	.use(
		cors({
			origin: allowedOrigins,
			methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
			credentials: true,
		}),
	)

	// better auth handler
	.all("/api/auth/*splat", toNodeHandler(auth)) //  For ExpressJS v5

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
