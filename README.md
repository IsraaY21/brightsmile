# BrightSmile

BrightSmile is an appointment booking system for a dental clinic. A patient picks a service, a doctor and a free time, and books it. The clinic's staff see the day's appointments, and the same time can never be booked twice.

Stack: NestJS, Next.js, React Native, PostgreSQL, Redis and Docker.

## Status

Work in progress.

## Requirements

- Node.js 24 or newer
- pnpm 12
- Docker Desktop

## Getting started

```bash
git clone https://github.com/IsraaY21/brightsmile.git
cd brightsmile
pnpm install
cp .env.example .env
```

Set a password in `.env`, in both `POSTGRES_PASSWORD` and `DATABASE_URL`. Use letters, digits and `-` only: `@`, `:` and `/` break the URL.

## Run the database

Docker Desktop must be running.

```bash
docker compose up -d --wait
pnpm --filter api db:migrate
pnpm --filter api db:seed
```

This starts PostgreSQL, applies the migrations and seeds five services. To check the seed:

```bash
docker compose exec -T postgres psql -U brightsmile -d brightsmile -c "SELECT name, price_cents FROM services ORDER BY name;"
```

Stop the database with `docker compose stop`. The data stays.

## Run the API

```bash
pnpm --filter api start:dev
```

The API listens on `http://localhost:3000`. Check it from a second terminal:

```bash
curl http://localhost:3000/health
```

The answer is `{"status":"ok"}`.

## Run the tests

```bash
pnpm --filter api test
pnpm --filter api test:e2e
```
