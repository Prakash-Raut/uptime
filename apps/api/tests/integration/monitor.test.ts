import { faker } from "@faker-js/faker";
import db from "@uptime/db";
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from "bun:test";
import server from "index";
import request from "supertest";

describe("Monitor API", () => {
	beforeAll(async () => {
		await db.$connect();
	});

	beforeEach(async () => {
		console.log("Before each");
	});

	afterAll(async () => {
		await db.$disconnect();
	});

	afterEach(async () => {
		console.log("After each");
	});

	it("should create a monitor", async () => {
		const res = await request(server).post("/api/v1/monitors").send({
			url: faker.internet.url(),
			name: faker.word.noun(),
		});
		expect(res.status).toBe(201);
		expect(res.body.id).toBeDefined();
	});

	it("should return 400 if url is invalid", async () => {
		const res = await request(server)
			.post("/api/v1/monitors")
			.send({
				url: "invalid-url",
				name: faker.word.noun(),
			})
			.expect(400);
		expect(res.body.message).toBe("Invalid URL");
	});

	it("should return all monitors", async () => {
		// await db.monitor.create({
		//   data: {
		//     url: "https://supabase.com",
		//     userId: "test-user-id",
		//     name: "test-monitor",
		//   },
		// });
		const res = await request(server).get("/api/v1/monitors").expect(200);
		expect(res.body.length).toBeGreaterThan(0);
	});

	// it("should return a monitor by ID", async () => {
	// 	await db.monitor.create({
	// 		data: {
	// 			name: "test-monitor",
	// 			url: "https://supabase.com",
	// 			userId: "test-user-id",
	// 		},
	// 	});
	// 	const res = await request(server).get("/api/v1/monitors").expect(200);
	// 	expect(res.body.length).toBeGreaterThan(0);
	// 	const monitor = res.body[0];
	// 	const res2 = await request(server)
	// 		.get(`/api/v1/monitors/${monitor.id}`)
	// 		.expect(200);
	// 	expect(res2.body.url).toBe(monitor.url);
	// 	expect(res2.body.id).toBe(monitor.id);
	// });

	// it("should return 404 if monitor not found", async () => {
	// 	const res = await request(server).get("/api/v1/monitors/123").expect(404);
	// 	expect(res.body.message).toBe("monitor not found");
	// });

	// it("should update a monitor", async () => {
	// 	const res = await request(server)
	// 		.post("/api/v1/monitors")
	// 		.send({ url: "https://supabase.com" });
	// 	expect(res.status).toBe(201);
	// 	expect(res.body.url).toBe("https://supabase.com");
	// 	expect(res.body.id).toBeDefined();
	// 	const res2 = await request(server)
	// 		.patch(`/api/v1/monitors/${res.body.id}`)
	// 		.send({ url: "https://supabase.com/new" })
	// 		.expect(200);
	// 	expect(res2.body.url).toBe("https://supabase.com/new");
	// 	expect(res2.body.id).toBe(res.body.id);
	// });

	// it("should delete a monitor", async () => {
	// 	const res = await request(server)
	// 		.post("/api/v1/monitors")
	// 		.send({ url: "https://supabase.com" });
	// 	expect(res.status).toBe(201);
	// 	expect(res.body.url).toBe("https://supabase.com");
	// 	expect(res.body.id).toBeDefined();
	// 	const res2 = await request(server)
	// 		.delete(`/api/v1/monitors/${res.body.id}`)
	// 		.expect(200);
	// 	expect(res2.body.url).toBe("https://supabase.com");
	// 	expect(res2.body.id).toBe(res.body.id);
	// });
});
