"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var health_routes_1 = __importDefault(require("./health.routes"));
var products_routes_1 = __importDefault(require("./products.routes"));
var routes = express_1.default();
routes.use('/health', health_routes_1.default);
routes.use('/products', products_routes_1.default);
exports.default = routes;
