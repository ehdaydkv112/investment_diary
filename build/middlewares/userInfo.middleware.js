"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const response_1 = __importDefault(require("../common/response/response"));
const jwt_1 = __importDefault(require("../lib/jwt"));
const database_1 = __importDefault(require("../database/database"));
const accessTokenTypeCheck = async (authorization) => {
    if (typeof authorization === 'string') {
        const [accessTokenType, accessTokenValue] = authorization.split(' ');
        if (accessTokenType !== 'Bearer')
            return '';
        return accessTokenValue;
    }
    return '';
};
const findUserInfo = async (verifyedAccessToken) => {
    const userInfo = (await database_1.default.userInfo.select({
        userIdx: verifyedAccessToken.user_idx,
    }));
    if (userInfo.length) {
        return {
            result: true,
            data: userInfo[0],
        };
    }
    return {
        result: false,
        data: {},
    };
};
const userAuthMiddleWare = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization)
            return res.status(201).json(response_1.default.error.customError('noneHead', {}));
        const accessTokenValue = await accessTokenTypeCheck(authorization);
        if (accessTokenValue === '')
            return res.status(201).json(response_1.default.error.customError('TypeIncorrect', {}));
        const verifyedAccessToken = await jwt_1.default.verifyToken(accessTokenValue);
        const userInfo = await findUserInfo(verifyedAccessToken);
        if (userInfo.result)
            res.locals.userInfo = userInfo.result;
        else
            return res.status(201).json(response_1.default.error.customError('noneUserInfo', {}));
        return next();
    }
    catch (err) {
        return res.status(400).json(response_1.default.error.catchError());
    }
};
module.exports = userAuthMiddleWare;
