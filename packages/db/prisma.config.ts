import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";
import path from "node:path";

dotenv.config({
	path: path.join("../../apps/api/.env"),
});

export default defineConfig({
	schema: "prisma/schema/schema.prisma",
	migrations: {
		path: "prisma/migrations",
		seed: "tsx ./src/seed.ts",
	},
	datasource: {
		url: env("DATABASE_URL"),
	},
});
