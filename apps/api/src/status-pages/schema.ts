import { z } from "zod";

export const statusPageSchema = z.object({
	id: z.uuid(),
	title: z.string().min(1, { message: "Title is required" }),
	slug: z.string().min(1, { message: "Slug is required" }),
	isPublic: z.boolean().default(true),
	verified: z.boolean().default(false),
	userId: z.uuid(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type StatusPage = z.infer<typeof statusPageSchema>;

export const createStatusPageSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }),
	slug: z.string().min(1, { message: "Slug is required" }),
	isPublic: z.boolean().default(true),
	verified: z.boolean().default(false),
});

export type StatusPageCreateInput = z.infer<typeof createStatusPageSchema>;

export const updateStatusPageSchema = createStatusPageSchema.partial();

export type StatusPageUpdateInput = z.infer<typeof updateStatusPageSchema>;
