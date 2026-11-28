import { INestApplication, VersioningType } from '@nestjs/common';

// Used by main.ts and by the e2e tests, so the tests call the same URLs as
// a real client.
export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
}
