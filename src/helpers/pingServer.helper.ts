import request, { Response } from 'request';

interface PingServerResponse {
  statusCode?: number;
  ping?: number;
  error?: Error;
}

class TestConnectionHelper {
  public async ping(uri: string): Promise<PingServerResponse> {
    return new Promise((resolve, reject) => {
      request({ uri, time: true }, (error: Error, response: Response, _) => {
        if (error) return reject({ error });

        resolve({
          statusCode: response.statusCode,
          ping: response.elapsedTime,
        });
      });
    });
  }
}

export default new TestConnectionHelper();
