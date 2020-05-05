import MercadoLivreCrawler from '../services/MercadoLivreCrawler.service';
import MercadoLivreCrawlerService from '../services/MercadoLivreCrawler.service';

interface RequestIndex {
  search: string;
  limit?: number;
  offset?: number;
}

interface ResponseProducts {
  count: number;
  offset: number;
  rows: [];
}

class ProductsController {
  private mercadoLivreCrawlerService: MercadoLivreCrawler;

  constructor() {
    this.mercadoLivreCrawlerService = new MercadoLivreCrawler();
  }

  public async index({
    search,
    limit,
    offset,
  }: RequestIndex): ResponseProducts {
    const products = await this.mercadoLivreCrawlerService.listProducts({
      search,
      limit,
      offset,
    });

    const response = {
      rows: products,
      count: products.length,,
      offset: offset || 0,
    };

    return response;
    ""
  }
}

export default new ProductsController();
