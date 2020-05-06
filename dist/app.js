"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var routes_1 = __importDefault(require("./routes"));
var AppGlobalError_helper_1 = __importDefault(require("./helpers/AppGlobalError.helper"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(function (error, request, response, _) {
    if (error instanceof AppGlobalError_helper_1.default) {
        return response.status(error.statusCode).json({
            message: error.message,
        });
    }
    console.error(error.message);
    return response.status(500).json({
        message: 'Internal server error',
    });
});
exports.default = app;
