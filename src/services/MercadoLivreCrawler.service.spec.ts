import MercadoLivreCrawlerService from './MercadoLivreCrawler.service';
import cheerio from 'cheerio';
import { promises } from 'fs';
import { resolve } from 'path';

describe('MercadoLivreCrawlerService', () => {
  it('should return a list of 29 products', async () => {
    const data = await promises.readFile(
      resolve(__dirname, 'mockFiles', 'mercadolivre.html'),
    );

    function getHtmlBodyMockFunction(uri: string): Promise<CheerioStatic> {
      return Promise.resolve(cheerio.load(data));
    }

    const mercadoLivreCrawlerService = new MercadoLivreCrawlerService();

    mercadoLivreCrawlerService.getHtmlBody = getHtmlBodyMockFunction;

    const products = await mercadoLivreCrawlerService.listProducts({
      search: 'óculos',
    });

    expect(products.length).toBe(29);
  });

  it('should return a list of 2 products', async () => {
    const data = await promises.readFile(
      resolve(__dirname, 'mockFiles', 'mercadolivre.html'),
    );

    function getHtmlBodyMockFunction(uri: string): Promise<CheerioStatic> {
      return Promise.resolve(cheerio.load(data));
    }

    const mercadoLivreCrawlerService = new MercadoLivreCrawlerService();

    mercadoLivreCrawlerService.getHtmlBody = getHtmlBodyMockFunction;

    const products = await mercadoLivreCrawlerService.listProducts({
      search: 'óculos',
      limit: 2,
    });

    expect(products.length).toBe(2);
  });
});
