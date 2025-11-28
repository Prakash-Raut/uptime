import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import type { ZodSchema } from "zod";

export const validate =
	<T extends ZodSchema>(schema: T) =>
	(req: Request, _res: Response, next: NextFunction): void => {
		const parsed = schema.safeParse(req.body);
		if (!parsed.success) {
			next(
				createHttpError(400, {
					message: "Validation failed",
					errors: parsed.error.flatten().fieldErrors,
				}),
			);
		}
		req.validated = parsed.data;
		next();
	};
