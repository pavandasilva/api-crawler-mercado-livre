import express from 'express';
import healthRoutes from './health.routes';

const routes = express();

routes.use('/health', healthRoutes);

export default routes;
