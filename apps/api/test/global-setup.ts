import { Client, escapeIdentifier } from 'pg';
import type { TestProject } from 'vitest/node';
import { migrateDatabase } from '../src/db/migrate.js';

export default async function setup(project: TestProject): Promise<void> {
  const databaseUrl = project.config.env.DATABASE_URL;
  if (!databaseUrl?.endsWith('_test')) {
    throw new Error('The e2e tests need a DATABASE_URL that ends in _test.');
  }
  const name = new URL(databaseUrl).pathname.slice(1);

  // CREATE DATABASE has to run from another database. "postgres" exists on
  // every server.
  const serverUrl = new URL(databaseUrl);
  serverUrl.pathname = '/postgres';
  const client = new Client({ connectionString: serverUrl.href });
  await client.connect();

  try {
    const found = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [name],
    );
    if (found.rowCount === 0) {
      await client.query(`CREATE DATABASE ${escapeIdentifier(name)}`);
    }
  } finally {
    await client.end();
  }

  await migrateDatabase(databaseUrl);
}
