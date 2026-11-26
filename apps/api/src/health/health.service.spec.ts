import { HealthService } from './health.service.js';

describe('HealthService', () => {
  it('says that the API is ok', () => {
    const service = new HealthService();

    expect(service.check()).toEqual({ status: 'ok' });
  });
});
