import path from "node:path";
import { defineConfig, type UserConfig } from "tsdown";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: UserConfig = defineConfig({
	entry: "./src/index.ts",
	format: "esm",
	outDir: "./dist",
	clean: true,
	noExternal: [/@uptime\/.*/],

	alias: {
		"@": path.resolve(__dirname, "src"),
	},
});

export default config;
