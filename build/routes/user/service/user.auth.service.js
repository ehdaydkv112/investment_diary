"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const database_1 = __importDefault(require("../../../database/database"));
const crypto_1 = __importDefault(require("../../../lib/crypto"));
const jwt_1 = __importDefault(require("../../../lib/jwt"));
const checkEmail = async (data) => {
    const userEmailFromMySqlForDuplicatePrevention = await database_1.default.userInfo.select({
        userEmail: data.userEmail,
    });
    if (!userEmailFromMySqlForDuplicatePrevention.length)
        return true;
    return false;
};
const join = async (data) => {
    const userInfo = await database_1.default.userInfo.select({
        userEmail: data.userEmail,
    });
    if (userInfo.length)
        return false;
    await database_1.default.mailCode.delete({
        userEmail: data.userEmail,
    });
    const hashedUserPassword = await crypto_1.default.makePassword(data.userPassword || '');
    await database_1.default.userInfo.insertOne({
        userEmail: data.userEmail,
        userPassword: hashedUserPassword,
    });
    return true;
};
const login = async (data) => {
    const hashedUserPassword = await crypto_1.default.makePassword(data.userPassword || '');
    const userInfo = (await database_1.default.userInfo.select({
        userEmail: data.userEmail,
        userPassword: hashedUserPassword,
    }));
    const result = {
        loginResult: false,
        accessToken: '',
        refreshToken: '',
        userAgent: '',
    };
    if (userInfo.length) {
        result.loginResult = true;
        result.accessToken = await jwt_1.default.makeToken(userInfo[0].user_idx, 1);
        result.refreshToken = await jwt_1.default.makeToken(userInfo[0].user_idx, 30);
    }
    return result;
};
const service = {
    checkEmail,
    join,
    login,
};
module.exports = service;
