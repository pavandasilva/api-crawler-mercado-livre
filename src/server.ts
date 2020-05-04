import express from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';

import routes from './routes';

dotenv.config({ path: resolve('env', `.env.${process.env.NODE_ENV}`) });

const app = express();
const appPort = process.env.APP_PORT;

app.use(express.json());
app.use(routes);

app.listen(appPort, () => {
  console.log(
    `Server started on port ${appPort} in ${process.env.NODE_ENV} mode`,
  );
});
