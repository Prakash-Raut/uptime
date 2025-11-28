import logger from "@uptime/logger";
import type { NextFunction, Request, RequestHandler, Response } from "express";

export const loggerMiddleware: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;

		logger.info(
			{
				method: req.method,
				url: req.originalUrl,
				status: res.statusCode,
				duration: `${duration}ms`,
				ip: req.ip,
				userId: req.user?.id || null,
			},
			"Request completed 🎯",
		);
	});

	next();
};
