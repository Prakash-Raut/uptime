import { z } from "zod";

export const monitorSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	url: z.url({ message: "Invalid URL" }),
	frequency: z.enum(["1m", "5m", "10m"]).default("5m"),
	userId: z.string().min(1, { message: "User ID is required" }),
});

export const createMonitorSchema = monitorSchema.omit({ userId: true });

export type MonitorCreateInput = z.infer<typeof createMonitorSchema>;

export const monitorUpdateSchema = monitorSchema
	.pick({ name: true, url: true, frequency: true })
	.partial();

export type MonitorUpdateInput = z.infer<typeof monitorUpdateSchema>;
