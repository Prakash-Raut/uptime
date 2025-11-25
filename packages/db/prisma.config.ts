import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, env } from "prisma/config";

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server .env file
dotenv.config({
	path: path.join(__dirname, "../../apps/server/.env"),
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
