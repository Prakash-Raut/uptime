import { z } from "zod";

export const regionSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Region name is required" })
		.max(30, { message: "Region name must be less than 30 characters" }),
	code: z.string().min(1, { message: "Region code is required" }),
});
