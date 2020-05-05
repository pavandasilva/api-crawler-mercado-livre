import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import AppGlobalErrorHelper from './helpers/AppGlobalError.helper';

const app = express();

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

export default app;
