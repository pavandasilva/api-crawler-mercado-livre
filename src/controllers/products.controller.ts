import MercadoLivreCrawlerService from '../services/Service.service';

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
  private mercadoLivreCrawlerService: MercadoLivreCrawlerService;

  constructor() {
    this.mercadoLivreCrawlerService = new MercadoLivreCrawlerService();
  }

  public async index({
    search,
    limit,
    offset,
  }: RequestIndex): Promise<ResponseProducts> {
    const products = await this.mercadoLivreCrawlerService.listProducts({
      search,
      limit,
      offset,
    });

    const response = {
      rows: products,
      count: products.length,
      offset: offset || 0,
    };

    return response;
  }
}

export default new ProductsController();
