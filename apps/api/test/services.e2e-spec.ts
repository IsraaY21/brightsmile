import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { configureApp } from './../src/app.setup.js';
import { DATABASE, type Database } from './../src/db/database.module.js';
import { services } from './../src/db/schema/index.js';

describe('GET /api/v1/services (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();

    const db = app.get<Database>(DATABASE);
    await db.delete(services);
    await db.insert(services).values([
      {
        name: 'Teeth whitening',
        description: 'Whitening in one visit.',
        durationMinutes: 60,
        priceCents: 28000,
      },
      {
        name: 'Check-up and clean',
        description: 'A full check of teeth and gums.',
        durationMinutes: 45,
        priceCents: 6500,
      },
      {
        name: 'Gold filling',
        description: 'No longer offered.',
        durationMinutes: 60,
        priceCents: 45000,
        isActive: false,
      },
    ]);
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns the active services, sorted by name', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/services');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: expect.any(String),
        name: 'Check-up and clean',
        description: 'A full check of teeth and gums.',
        durationMinutes: 45,
        priceCents: 6500,
        isActive: true,
        createdAt: expect.any(String),
      },
      {
        id: expect.any(String),
        name: 'Teeth whitening',
        description: 'Whitening in one visit.',
        durationMinutes: 60,
        priceCents: 28000,
        isActive: true,
        createdAt: expect.any(String),
      },
    ]);
  });
});
