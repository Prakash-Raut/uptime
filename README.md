# Uptime Monitoring Service

Simple uptime monitoring service written in Go. It exposes a REST API to manage websites, regions, and ticks, and a background worker that periodically checks websites and logs their status.

## Features

- REST API using `gin`
- PostgreSQL with `gorm` migrations
- Worker process that checks websites every 3 seconds using a small worker pool
- Docker Compose recipe for PostgreSQL

## Project Structure

- `cmd/server` – HTTP API server (Gin)
- `cmd/worker` – background worker that checks website status
- `internal/db` – DB connection helper (GORM + Postgres)
- `internal/models` – GORM models (`Website`, `Region`, `Tick`)
- `internal/routes` – API route registrations
- `internal/producer` – periodically enqueues websites onto a channel
- `internal/consumer` – worker logic that performs HTTP checks

## Requirements

- Go 1.23+
- PostgreSQL 16 (or via Docker Compose)

## Quick Start

### 1) Start PostgreSQL with Docker (recommended)

```bash
docker compose up -d
```

This starts a Postgres 16 instance on `localhost:5432` with:

- user: `postgres`
- password: `secret`
- database: `uptime_monitor`

### 2) Create a `.env` file

Create a `.env` file at the repository root. The DB helper loads `../../.env` relative to `internal/db`, which resolves to the project root.

```bash
DB_USER=postgres
DB_PASS=secret
DB_NAME=uptime_monitor
```

Note: The models use `default:gen_random_uuid()`; ensure the extension exists in your database:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

### 3) Run the API server

```bash
go run ./cmd/server
```

You should see:

```bash
🚀 API running on http://localhost:8080
```

### 4) Run the worker

In a separate terminal:

```bash
go run ./cmd/worker
```

You should see worker logs like:

```bash
🧠 Worker started
Worker 0: Checking https://example.com
```

## API

Base URL: `http://localhost:8080`

### Websites

- `GET /api/websites` – list websites
- `POST /api/websites` – create website

Request body:

```json
{
  "url": "https://example.com"
}
```

Response example:

```json
{
  "id": "<uuid>",
  "url": "https://example.com",
  "time_added": "<timestamp>",
  "ticks": []
}
```

### Regions

- `GET /api/regions` – list regions
- `POST /api/regions` – create region

Request body:

```json
{
  "name": "us-east-1"
}
```

### Ticks

- `GET /api/ticks` – list ticks
- `POST /api/ticks` – create tick

Request body:

```json
{
  "status": "up",
  "response_time_ms": 123,
  "website_id": "<uuid>",
  "region_id": "<uuid>"
}
``;

## How the worker works

- The producer (`internal/producer`) polls the database every 3 seconds and sends each website to a channel.
- Three consumer goroutines (`internal/consumer`) read from the channel and perform a simple HTTP `GET` to check status.
- Status is currently printed to stdout; extend this to create `Tick` records or add alerting.

## Local Development Notes

- DB connection: `internal/db/connect.go` uses GORM and reads `DB_USER`, `DB_PASS`, `DB_NAME` from `.env`.
- Migrations: on server start, GORM auto-migrates `Website`, `Region`, and `Tick`.
- UUIDs: models rely on `gen_random_uuid()`; enable the `pgcrypto` extension as shown above.

## Useful cURL examples

```bash
# Create a website
curl -X POST http://localhost:8080/api/websites \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'

# List websites
curl http://localhost:8080/api/websites

# Create a region
curl -X POST http://localhost:8080/api/regions \
  -H "Content-Type: application/json" \
  -d '{"name":"us-east-1"}'

# List ticks
curl http://localhost:8080/api/ticks
```
