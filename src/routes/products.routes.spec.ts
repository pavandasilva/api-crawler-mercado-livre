import request from 'supertest';
import app from '../app';

describe('ProductsRoutes', () => {
  it('should return status code 200', async () => {
    const data = {
      search: 'oculos',
      limit: 10,
      offset: 5,
    };

    const response = await request(app).post('/products').send(data);

    expect(response.status).toBe(200);
  });

  it('should return error when not having the search', async () => {
    const data = {
      limit: 10,
      offset: 5,
    };

    const response = await request(app).post('/products').send(data);
    expect(response.status).toBe(400);
  });
});
