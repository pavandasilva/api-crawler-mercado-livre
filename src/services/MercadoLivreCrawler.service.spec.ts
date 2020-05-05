import MercadoLivreCrawlerService from './MercadoLivreCrawler.service';

describe('MercadoLivreCrawlerService', () => {
  it('should return a list of 25 products', async () => {
    const mercadoLivreCrawlerService = new MercadoLivreCrawlerService();

    const products = await mercadoLivreCrawlerService.listProducts({
      search: 'hd',
    });

    expect(products.length).toBe(25);
  });
});
