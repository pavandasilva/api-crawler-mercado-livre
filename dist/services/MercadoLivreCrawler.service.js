"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var cheerio_1 = __importDefault(require("cheerio"));
var MercadoLivreCrawlerService = /** @class */ (function () {
    function MercadoLivreCrawlerService() {
        this.baseUrl = 'https://lista.mercadolivre.com.br';
        this.products = [];
    }
    MercadoLivreCrawlerService.prototype.addProduct = function (_a) {
        var name = _a.name, price = _a.price, link = _a.link, store = _a.store, state = _a.state;
        //verifica se o produto tem dados
        if (!name) {
            return;
        }
        this.products.push({ name: name, price: price, link: link, store: store, state: state });
    };
    MercadoLivreCrawlerService.prototype.getProducts = function () {
        return this.products;
    };
    MercadoLivreCrawlerService.prototype.countProducts = function () {
        return this.products.length;
    };
    MercadoLivreCrawlerService.prototype.getHtmlBody = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        request_1.default(uri, function (error, response, body) {
                            if (error)
                                return reject({ error: error });
                            var $ = cheerio_1.default.load(body);
                            resolve($);
                        });
                    })];
            });
        });
    };
    MercadoLivreCrawlerService.prototype.listProducts = function (_a) {
        var search = _a.search, _b = _a.limit, limit = _b === void 0 ? 29 : _b, _c = _a.offset, offset = _c === void 0 ? 0 : _c;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_d) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var uri, $;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    uri = this.baseUrl + "/" + search + "_Desde_" + offset;
                                    return [4 /*yield*/, this.getHtmlBody(uri)];
                                case 1:
                                    $ = _a.sent();
                                    $('#searchResults li').each(function (_, item) {
                                        /*
                                          retorna a lista de produtos quando a lista estiver
                                          com o número limite igual ao definido na busca
                                        */
                                        var countProducts = _this.countProducts();
                                        if (countProducts >= limit) {
                                            var products = _this.getProducts();
                                            return resolve(products);
                                        }
                                        var rowItem = $(item).find('.rowItem');
                                        var link = $(rowItem).find('a').attr('href');
                                        var itemInfo = $(rowItem).find('a').find('.item__info');
                                        var state = $(rowItem).find('a').find('.item__status').text().trim();
                                        var itemPrice = $(itemInfo).find('.item__price');
                                        var priceFraction = $(itemPrice)
                                            .find('.price__fraction')
                                            .text()
                                            .trim()
                                            .replace('.', '');
                                        var priceDecimals = $(itemPrice).find('.price__decimals').text().trim();
                                        var price = Number(priceFraction + "." + priceDecimals).toFixed(2);
                                        var name = $(itemInfo).find('h2').find('.main-title').text().trim();
                                        var store = $(itemInfo)
                                            .find('h2')
                                            .find('.item__brand')
                                            .find('.item__brand-title-tos')
                                            .text()
                                            .replace('por', '')
                                            .trim();
                                        var product = {
                                            name: name,
                                            link: link,
                                            price: price,
                                            state: state,
                                            store: store,
                                        };
                                        _this.addProduct(product);
                                    });
                                    resolve(this.getProducts());
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return MercadoLivreCrawlerService;
}());
exports.default = MercadoLivreCrawlerService;