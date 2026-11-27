import { drizzle } from 'drizzle-orm/node-postgres';
import { services, type NewService } from './schema/index.js';

const seedServices: NewService[] = [
  {
    name: 'Check-up and clean',
    description:
      'A full check of your teeth and gums, then a professional clean.',
    durationMinutes: 45,
    priceCents: 6500,
  },
  {
    name: 'Tooth-coloured filling',
    description: 'A white filling that matches the colour of the tooth.',
    durationMinutes: 45,
    priceCents: 9500,
  },
  {
    name: 'Teeth whitening',
    description: 'Whitening in the chair with a gel and a light.',
    durationMinutes: 60,
    priceCents: 28000,
  },
  {
    name: 'Root canal treatment',
    description:
      'Treatment of an infected tooth nerve, with local anaesthetic.',
    durationMinutes: 90,
    priceCents: 39000,
  },
  {
    name: "Children's check-up",
    description: 'For children under 12. A parent stays in the room.',
    durationMinutes: 30,
    priceCents: 4000,
  },
];

async function seed(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set. Look at .env.example.');
  }

  const db = drizzle(databaseUrl);
  try {
    const created = await db
      .insert(services)
      .values(seedServices)
      .onConflictDoNothing({ target: services.name })
      .returning({ name: services.name });

    const skipped = seedServices.length - created.length;
    console.log(
      `Seed: ${created.length} services created, ${skipped} skipped.`,
    );
  } finally {
    await db.$client.end();
  }
}

await seed();
