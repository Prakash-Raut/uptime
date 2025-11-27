import logger from "@uptime/logger";
import { createExpressServer } from "./app";

const PORT = 3000;

export const server = createExpressServer();

server.listen(PORT, async () => {
	logger.info({ port: PORT }, "🔥API is live");
});
