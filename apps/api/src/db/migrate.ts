import { join } from 'node:path';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

// src/db and dist/db are both two levels below apps/api, so the same path
// works from the sources and from the build.
const migrationsFolder = join(import.meta.dirname, '..', '..', 'drizzle');

export async function migrateDatabase(databaseUrl: string): Promise<void> {
  const db = drizzle(databaseUrl);

  try {
    await migrate(db, { migrationsFolder });
  } finally {
    await db.$client.end();
  }
}

if (import.meta.main) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set. Look at .env.example.');
  }

  await migrateDatabase(databaseUrl);
  console.log('Migrate: the database is up to date.');
}
