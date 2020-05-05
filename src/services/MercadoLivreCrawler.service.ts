import request, { Response, MultipartBody } from 'request';
import cheerio from 'cheerio';

interface Product {
  name: string;
  link?: string;
  price: string;
  store?: string;
  state?: string;
}

interface RequestProducts {
  search: string;
  limit?: number;
  offset?: number;
}

class MercadoLivreCrawlerService {
  private baseUrl = 'https://lista.mercadolivre.com.br';
  private products: Product[] = [];

  private addProduct({ name, price, link, store, state }: Product): void {
    //verifica se o produto tem dados
    if (!name) {
      return;
    }

    this.products.push({ name, price, link, store, state });
  }

  private getProducts(): Product[] {
    return this.products;
  }

  private countProducts(): number {
    return this.products.length;
  }

  public async getHtmlBody(uri: string): Promise<CheerioStatic> {
    return new Promise((resolve, reject) => {
      request(uri, (error: Error, response: Response, body) => {
        if (error) return reject({ error });
        const $ = cheerio.load(body);

        resolve($);
      });
    });
  }

  public async listProducts({
    search,
    limit = 29,
    offset = 0,
  }: RequestProducts): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.baseUrl}/${search}_Desde_${offset}`;
      const $ = await this.getHtmlBody(uri);

      $('#searchResults li').each((_, item) => {
        /*
          retorna a lista de produtos quando a lista estiver 
          com o número limite igual ao definido na busca
        */
        let countProducts = this.countProducts();

        if (countProducts >= limit) {
          const products: Product[] = this.getProducts();
          return resolve(products);
        }

        let rowItem = $(item).find('.rowItem');
        let link = $(rowItem).find('a').attr('href');
        let itemInfo = $(rowItem).find('a').find('.item__info');

        let state = $(rowItem).find('a').find('.item__status').text().trim();

        let itemPrice = $(itemInfo).find('.item__price');

        let priceFraction = $(itemPrice)
          .find('.price__fraction')
          .text()
          .trim()
          .replace('.', '');

        let priceDecimals = $(itemPrice).find('.price__decimals').text().trim();

        let price = Number(`${priceFraction}.${priceDecimals}`).toFixed(2);
        let name = $(itemInfo).find('h2').find('.main-title').text().trim();

        let store = $(itemInfo)
          .find('h2')
          .find('.item__brand')
          .find('.item__brand-title-tos')
          .text()
          .replace('por', '')
          .trim();

        let product: Product = {
          name,
          link,
          price,
          state,
          store,
        };

        this.addProduct(product);
      });

      resolve(this.getProducts());
    });
  }
}

export default MercadoLivreCrawlerService;
