import dotenv from 'dotenv';
import app from './app';
import { resolve } from 'path';

dotenv.config({ path: resolve('env', `.env.${process.env.NODE_ENV}`) });

app.listen(process.env.APP_PORT, () => {
  console.log(`Application running on port ${process.env.APP_PORT}`);
});
