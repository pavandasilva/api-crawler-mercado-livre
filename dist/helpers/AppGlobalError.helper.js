"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppGlobalError = /** @class */ (function () {
    function AppGlobalError(message, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.message = message;
        this.statusCode = statusCode;
    }
    return AppGlobalError;
}());
exports.default = AppGlobalError;
