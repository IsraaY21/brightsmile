import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  it('says that the API is ok', () => {
    const controller = new HealthController();

    expect(controller.check()).toEqual({ status: 'ok' });
  });
});
