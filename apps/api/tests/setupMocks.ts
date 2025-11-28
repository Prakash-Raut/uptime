import { mock } from "bun:test";
import type { NextFunction, Request, Response } from "express";

mock.module("@/middlewares/auth", () => ({
	requireAuth: (req: Request, _res: Response, next: NextFunction) => {
		req.user = {
			id: "KS5OvXKTHcWvE6kLwU8eYuMmhsNxVZ6V",
			email: "prakashraut2537@gmail.com",
			emailVerified: true,
			name: "Prakash Raut",
			image:
				"https://lh3.googleusercontent.com/a/ACg8ocJ8H1tYxAylFatSoKiSpH_IIpk99Hcztqndp9cqOoQNcQ87VMrm=s96-c",
			createdAt: new Date("2025-11-17 06:34:35.593"),
			updatedAt: new Date("2025-11-17 06:34:35.593"),
		};
		next();
	},
}));
