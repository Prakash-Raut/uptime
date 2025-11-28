import rateLimit from "express-rate-limit";

// Global rate limiter
export const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 mins
	max: 100, // Max requests per window per IP
	standardHeaders: true, // Return rate limit info in headers
	legacyHeaders: false, // Disable deprecated headers
	message: {
		success: false,
		error: "Too many requests. Chill bro.",
	},
});
