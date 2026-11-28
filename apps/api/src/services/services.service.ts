import { Inject, Injectable } from '@nestjs/common';
import { asc, eq } from 'drizzle-orm';
import { DATABASE, type Database } from '../db/database.module.js';
import { type Service, services } from '../db/schema/index.js';

@Injectable()
export class ServicesService {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  findActive(): Promise<Service[]> {
    return this.db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(asc(services.name));
  }
}
