import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

describe('HealthController', () => {
  const fakeHealthService = {
    check: () => ({ status: 'fake' }),
  };

  it('returns what the service says, built by hand', () => {
    const controller = new HealthController(fakeHealthService);

    expect(controller.check()).toEqual({ status: 'fake' });
  });

  it('returns what the service says, built by NestJS', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: HealthService, useValue: fakeHealthService }],
    }).compile();
    const controller = moduleRef.get(HealthController);

    expect(controller.check()).toEqual({ status: 'fake' });
  });
});
