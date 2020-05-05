import express from 'express';
import healthRoutes from './health.routes';
import productsRoutes from './products.routes';

const routes = express();

routes.use('/health', healthRoutes);
routes.use('/products', productsRoutes);

export default routes;
