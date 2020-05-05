import request from 'supertest';
import app from '../app';

describe('HealthRoutes', () => {
  it('should return Mercado Livre data connection', async () => {
    const response = await request(app)
      .get('/health')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
  });
});
