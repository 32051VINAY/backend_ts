"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifytoken = exports.signjwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'dssdfgkfhhgcdzkljjhj';
const signjwt = (payload) => {
    try {
        const options = { expiresIn: '5h' };
        const token = jsonwebtoken_1.default.sign(payload, secret, options);
        return token;
    }
    catch (err) {
        return err;
    }
};
exports.signjwt = signjwt;
const verifytoken = (token) => {
    try {
        const tk = jsonwebtoken_1.default.verify(token, secret);
        return tk;
    }
    catch (err) {
        return err;
    }
};
exports.verifytoken = verifytoken;
//# sourceMappingURL=authManager.js.map