"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var app_1 = __importDefault(require("./app"));
var path_1 = require("path");
dotenv_1.default.config({ path: path_1.resolve('env', ".env." + process.env.NODE_ENV) });
app_1.default.listen(process.env.APP_PORT, function () {
    console.log("Application running on port " + process.env.APP_PORT);
});
