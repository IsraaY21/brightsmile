import { defineConfig } from 'vitest/config';

process.loadEnvFile('../../.env');

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Look at .env.example.');
}

// Same server and login as the development database, another database, so a
// test run never changes development data.
const testDatabaseUrl = new URL(process.env.DATABASE_URL);
testDatabaseUrl.pathname = '/brightsmile_test';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    globalSetup: ['./test/global-setup.ts'],
    // Every file uses the same database, so the files run one after another.
    fileParallelism: false,
    env: { DATABASE_URL: testDatabaseUrl.href },
  },
});
