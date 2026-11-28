import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { HealthService } from './health.service.js';

// Monitoring tools call /health, so it has no prefix (app.setup.ts) and no
// version.
@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check(): { status: string } {
    return this.healthService.check();
  }
}
