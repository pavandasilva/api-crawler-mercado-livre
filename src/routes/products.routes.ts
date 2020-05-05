import { Router, Request, Response } from 'express';
import pingServerHelper from '../helpers/pingServer.helper';
import AppGlobalError from '../helpers/AppGlobalError.helper';
import productsController from '../controllers/products.controller';

const products = Router();

products.post('/', async (request: Request, response: Response) => {
  const { search, limit, offset } = request.body;

  if (!search) {
    throw new AppGlobalError('search is required');
  }

  const responseTestConnection = await pingServerHelper.ping(
    'https://lista.mercadolivre.com.br/',
  );

  if (responseTestConnection.statusCode !== 200) {
    throw new AppGlobalError('could not connect to Mercado Livre', 503);
  }

  const products = await productsController.index({ search, limit, offset });

  return response.json(products);
});

export default products;
