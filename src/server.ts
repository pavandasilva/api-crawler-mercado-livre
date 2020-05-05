import 'reflect-metadata';
import express, { Request, Response, NextFunction, response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import { resolve } from 'path';

import routes from './routes';
import AppGlobalErrorHelper from './helpers/AppGlobalError.helper';

dotenv.config({ path: resolve('env', `.env.${process.env.NODE_ENV}`) });

const app = express();
const appPort = process.env.APP_PORT;

app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppGlobalErrorHelper) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }
    console.error(error.message);

    return response.status(500).json({
      message: 'Internal server error',
    });
  },
);

app.listen(appPort, () => {
  console.log(
    `Server started on port ${appPort} in ${process.env.NODE_ENV} mode`,
  );
});
