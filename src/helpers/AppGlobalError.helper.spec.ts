import AppGlobalError from './AppGlobalError.helper';

describe('AppGlobalErrorHelper', () => {
  it('should return status 400 when it is not reported', () => {
    const appGlobalError = new AppGlobalError('error');

    expect(appGlobalError.statusCode).toBe(400);
  });

  it('must return the same status as informed', () => {
    const status = 200;

    const appGlobalError = new AppGlobalError('error', status);

    expect(appGlobalError.statusCode).toBe(status);
  });

  it('must return the same message as informed', () => {
    const message = 'undefined error';

    const appGlobalError = new AppGlobalError(message);

    expect(appGlobalError.message).toBe(message);
  });
});
