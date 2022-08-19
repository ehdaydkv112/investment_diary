"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const crypto_1 = __importDefault(require("crypto"));
const makeCertificateCode = async () => {
    return crypto_1.default.randomBytes(3).toString('hex');
};
const makePassword = async (userPassword) => {
    return crypto_1.default.createHash('sha512').update(userPassword).digest('base64');
};
const cryptos = {
    makeCertificateCode,
    makePassword,
};
module.exports = cryptos;
