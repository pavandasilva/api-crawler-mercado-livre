import pingServer from './pingServer.helper';

describe('TestConnectionHelper', () => {
  beforeEach(() => {
    jest.setTimeout(20000);
  });
  beforeAll(done => {
    done();
  });

  it('must return status code 200 when accessing Google', async () => {
    const response = await pingServer.ping('http://www.google.com');
    expect(response.statusCode).toBe(200);
  });

  it('must return status code 200 when accessing Mercado Livre', async () => {
    const response = await pingServer.ping('http://www.mercadolivre.com.br');

    expect(response.statusCode).toBe(200);
  });

  it('should return the ping', async () => {
    const response = await pingServer.ping('http://www.google.com');

    expect(response.ping).toBeDefined();
  });

  it('should return error', async () => {
    try {
      await pingServer.ping('http://www');
    } catch (err) {
      expect(err).not.toBe(null);
    }
  });
});
