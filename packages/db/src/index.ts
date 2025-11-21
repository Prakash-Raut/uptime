import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client.js";

const pool = new PrismaPg({
	connectionString: process.env.DATABASE_URL as string,
});
const db = new PrismaClient({ adapter: pool });

export default db;
