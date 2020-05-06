import { Router, Request, Response } from 'express';
import pingServerHelper from '../helpers/pingServer.helper';
import { resolve } from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: resolve('env', `.env.${process.env.NODE_ENV}`) });

const healthRoutes = Router();

const appPort = process.env.APP_PORT;

healthRoutes.get('/', async (_: Request, response: Response) => {
  let responseTestConnection;

  try {
    responseTestConnection = await pingServerHelper.ping(
      'http://mercadolivre.com.br',
    );
  } catch (error) {
    responseTestConnection = error;
  } finally {
    response.json({
      mercadoLivreConnection: responseTestConnection,
      message: `Server started on port ${appPort} in ${process.env.NODE_ENV} mode`,
    });
  }
});

export default healthRoutes;
