import { auth } from "@uptime/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, RequestHandler, Response } from "express";

export const requireAuth: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// get the session from Better Auth
		const session = await auth.api.getSession({
			headers: fromNodeHeaders(req.headers),
		});

		if (!session || !session.user) {
			// no valid session → unauthorized
			return res.status(401).json({ error: "Not authenticated" });
		}

		// optionally attach session to request for downstream handlers
		req.session = session.session;
		req.user = session.user;

		// continue
		next();
	} catch (err) {
		console.error("Auth check error:", err);
		res.status(500).json({ error: "Internal auth error" });
	}
};
