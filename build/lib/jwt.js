"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const makeToken = async (userIdx, durationDay) => {
    const payload = {
        userIdx,
        exp: Date.now() / 1000 + 60 * 60 * 24 * durationDay,
        iat: Date.now() / 1000,
    };
    return jsonwebtoken_1.default.sign(payload, `${process.env.JWT_YAHO}`);
};
const verifyToken = async (token) => {
    return jsonwebtoken_1.default.verify(token, `${process.env.JWT_YAHO}`);
};
const jwt = {
    makeToken,
    verifyToken,
};
module.exports = jwt;
