import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module.js';
import { ServicesModule } from './services/services.module.js';

@Module({
  imports: [HealthModule, ServicesModule],
})
export class AppModule {}
