import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./prisma/generated/client.js";

type GetDbParams = {
	connectionString: string;
};

function getDb({ connectionString }: GetDbParams): PrismaClient {
	const pool = new PrismaPg({ connectionString });
	const prisma = new PrismaClient({ adapter: pool });

	return prisma;
}

// This export is needed to avoid the TypeScript error:
// ```
// The inferred type of 'prisma' cannot be named without a reference to '../node_modules/@repo/database/src/generated/prisma/client'.
// This is likely not portable. A type annotation is necessary.ts(2742)
// ```
export type { PrismaClient } from "./prisma/generated/client";

const db = getDb({ connectionString: process.env.DATABASE_URL as string });

export default db;
