import { faker } from "@faker-js/faker";
import db from "@uptime/db";
import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import server from "index";
import request from "supertest";

describe("Region API", () => {
	beforeAll(async () => {
		await db.$connect();
	});

	afterAll(async () => {
		await db.$disconnect();
	});

	it("should create a region", async () => {
		const res = await request(server)
			.post("/api/v1/regions")
			.send({
				name: faker.word.noun(),
				code: faker.string.alphanumeric(10),
			});
		expect(res.status).toBe(201);
		expect(res.body.id).toBeDefined();
	});

	it("should return all regions", async () => {
		const res = await request(server).get("/api/v1/regions").expect(200);
		expect(res.body.length).toBeGreaterThan(0);
	});

	it("should return a region by ID", async () => {
		const res = await request(server).get("/api/v1/regions").expect(200);
		expect(res.body.length).toBeGreaterThan(0);
		const region = res.body[0];
		const res2 = await request(server)
			.get(`/api/v1/regions/${region.id}`)
			.expect(200);
		expect(res2.body.id).toBe(region.id);
		expect(res2.body.name).toBe(region.name);
		expect(res2.body.code).toBe(region.code);
	});

	it("should return 404 if region not found", async () => {
		const res = await request(server).get("/api/v1/regions/123").expect(404);
		expect(res.body.message).toBe("Region not found");
	});

	it("should update a region", async () => {
		const res = await request(server)
			.post("/api/v1/regions")
			.send({ name: faker.word.noun(), code: faker.string.alphanumeric(10) });
		expect(res.status).toBe(201);
		expect(res.body.id).toBeDefined();
		const res2 = await request(server)
			.patch(`/api/v1/regions/${res.body.id}`)
			.send({ name: faker.word.noun(), code: faker.string.alphanumeric(10) })
			.expect(200);
		expect(res2.body.id).toBe(res.body.id);
	});

	it("should delete a region", async () => {
		const res = await request(server)
			.post("/api/v1/regions")
			.send({ name: faker.word.noun(), code: faker.string.alphanumeric(10) });
		expect(res.status).toBe(201);
		expect(res.body.id).toBeDefined();
		const res2 = await request(server)
			.delete(`/api/v1/regions/${res.body.id}`)
			.expect(200);
		expect(res2.body.id).toBe(res.body.id);
	});
});
