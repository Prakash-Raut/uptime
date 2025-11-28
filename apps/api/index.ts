import logger from "@uptime/logger";
import { createExpressServer } from "./src/app";

const PORT = 3000;
const server = createExpressServer();

server.listen(PORT, async () => {
	logger.info({ port: PORT }, "🔥API is live");
});

export default server;
