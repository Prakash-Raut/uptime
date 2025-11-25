// import { faker } from "@faker-js/faker";
// import db from "@uptime/db";

// const monitors = [
// 	"https://www.google.com",
// 	"https://www.facebook.com",
// 	"https://www.twitter.com",
// 	"https://www.instagram.com",
// 	"https://www.youtube.com",
// 	"https://www.linkedin.com",
// 	"https://www.github.com",
// 	"https://www.stackoverflow.com",
// 	"https://www.reddit.com",
// 	"https://www.wikipedia.org",
// 	"https://www.yahoo.com",
// 	"https://www.bing.com",
// 	"https://www.ask.com",
// 	"https://www.duckduckgo.com",
// 	"https://www.yahoo.com",
// 	"https://www.bing.com",
// 	"https://www.ask.com",
// ];

// async function main() {
// 	// delete all data
// 	// await db.user.deleteMany();
// 	// await db.session.deleteMany();
// 	// await db.account.deleteMany();
// 	// await db.monitor.deleteMany();
// 	// await db.tick.deleteMany();
// 	// await db.region.deleteMany();
// 	// await db.statusPage.deleteMany();
// 	// await db.incident.deleteMany();

// 	// Create demo user
// 	const demoUser = await db.user.findUnique({
// 		where: {
// 			email: "prakashraut2537@gmail.com",
// 		},
// 	});

// 	if (!demoUser) {
// 		throw new Error("Demo user not found");
// 	}

// 	// Create regions
// 	const regionNames = ["US East", "EU West", "AP South", "SA East"];
// 	const regionCodes = ["us-east-1", "eu-west-1", "ap-south-1", "sa-east-1"];

// 	await db.region.createMany({
// 		data: regionNames.map((name, index) => ({
// 			name,
// 			code: regionCodes[index] as string,
// 		})),
// 	});

// 	// Create monitors
// 	await db.monitor.createMany({
// 		data: monitors.map((url) => ({
// 			name: faker.word.noun(),
// 			url,
// 			freq: "1m",
// 			userId: demoUser.id,
// 		})),
// 	});

// 	// get created monitors
// 	const createdMonitors = await db.monitor.findMany();
// 	const createdRegions = await db.region.findMany();
// 	// create ticks for each monitor
// 	createdMonitors.forEach(async (monitor) => {
// 		await db.tick.create({
// 			data: {
// 				monitorId: monitor.id,
// 				regionId: createdRegions[
// 					Math.floor(Math.random() * createdRegions.length)
// 				]?.id as string,
// 				status: "UP",
// 				responseTimeMs: Math.floor(Math.random() * 500) + 1, // 1-500ms
// 			},
// 		});
// 	});

// 	// create status pages
// 	await db.statusPage.createMany({
// 		data: monitors.map(() => ({
// 			slug: faker.string.alphanumeric(10),
// 			title: faker.word.adjective(),
// 			userId: demoUser.id,
// 		})),
// 	});

// 	console.log("✅ Seeded database");
// }

// main()
// 	.then(async () => {
// 		await db.$disconnect();
// 	})
// 	.catch(async (e) => {
// 		console.error(e);
// 		await db.$disconnect();
// 		process.exit(1);
// 	});
