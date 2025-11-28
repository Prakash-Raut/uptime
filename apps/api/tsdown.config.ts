import { defineConfig, type UserConfig } from "tsdown";

const config: UserConfig = defineConfig({
	entry: "index.ts",
	format: "esm",
	outDir: "./dist",
	clean: true,
	noExternal: [/@uptime\/.*/],
});

export default config;
