import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client";

type GetDbParams = {
	connectionString: string;
};

export function getDb({ connectionString }: GetDbParams): PrismaClient {
	const pool = new PrismaPg({ connectionString });
	const prisma = new PrismaClient({ adapter: pool });

	return prisma;
}

export type { PrismaClient } from "../prisma/generated/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL environment variable is not set");
}

const db = getDb({ connectionString });
export default db;
