import logger from "@uptime/logger";
import { createExpressServer } from "./app";

const PORT = 3000;

export const server = createExpressServer();

void (function main() {
	try {
		server.listen(PORT, async () => {
			logger.info({ port: PORT }, "🔥API is live");
		});
	} catch (error) {
		logger.error({ error }, "🩻Error starting the server");
		process.exit(1);
	}
})();
