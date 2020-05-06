"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppGlobalError_helper_1 = __importDefault(require("./AppGlobalError.helper"));
describe('AppGlobalErrorHelper', function () {
    it('should return status 400 when it is not reported', function () {
        var appGlobalError = new AppGlobalError_helper_1.default('error');
        expect(appGlobalError.statusCode).toBe(400);
    });
    it('must return the same status as informed', function () {
        var status = 200;
        var appGlobalError = new AppGlobalError_helper_1.default('error', status);
        expect(appGlobalError.statusCode).toBe(status);
    });
    it('must return the same message as informed', function () {
        var message = 'undefined error';
        var appGlobalError = new AppGlobalError_helper_1.default(message);
        expect(appGlobalError.message).toBe(message);
    });
});
