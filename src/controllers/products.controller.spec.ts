import productsController from '../controllers/products.controller';

describe('ProductsController', () => {
  it('should return 2 products', async () => {
    const response = await productsController.index({
      search: 'óculos',
      limit: 2,
    });

    expect(response.count).toBe(2);
  });

  it('should return 29 products', async () => {
    const response = await productsController.index({
      search: 'óculos',
    });

    expect(response.count).toBe(29);
  });

  it('should return offset value equal 0', async () => {
    const response = await productsController.index({
      search: 'óculos',
    });

    expect(response.offset).toBe(0);
  });

  it('should return offset value equal 10', async () => {
    const response = await productsController.index({
      search: 'óculos',
      offset: 10,
    });

    expect(response.offset).toBe(10);
  });
});
