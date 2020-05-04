import { Router, Request, Response, response } from 'express';
import { resolve } from 'path';

import dotenv from 'dotenv';
dotenv.config({ path: resolve('env', `.env.${process.env.NODE_ENV}`) });

const healthRoutes = Router();

const appPort = process.env.APP_PORT;

healthRoutes.get('/', (_: Request, response: Response) =>
  response.json({
    message: `Server started on port ${appPort} in ${process.env.NODE_ENV} mode`,
  }),
);

export default healthRoutes;
