import { Controller, Get } from '@nestjs/common';
import type { Service } from '../db/schema/index.js';
import { ServicesService } from './services.service.js';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findActive(): Promise<Service[]> {
    return this.servicesService.findActive();
  }
}
