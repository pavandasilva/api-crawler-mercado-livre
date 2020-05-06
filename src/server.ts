import dotenv from 'dotenv';
import app from './app';
import { resolve } from 'path';

const http = require('http');

const server = http.createServer(app);

dotenv.config({ path: resolve('env', `.env.${process.env.NODE_ENV}`) });

server.listen(process.env.APP_PORT, () => {
  console.log(`Application running on port ${process.env.APP_PORT}`);
});
