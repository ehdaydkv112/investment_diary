"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const response_1 = __importDefault(require("../../../common/response/response"));
const user_auth_service_1 = __importDefault(require("../service/user.auth.service"));
const checkEmailForAvoidDuplication = async (req, res) => {
    try {
        const data = res.locals.investingDiaryRequest;
        const result = await user_auth_service_1.default.checkEmail(data);
        return res.status(200).json(response_1.default.success({ result }));
    }
    catch (err) {
        return res.status(400).json(response_1.default.error.catchError());
    }
};
const join = async (req, res) => {
    try {
        const data = res.locals.investingDiaryRequest;
        const result = await user_auth_service_1.default.join(data);
        return res.status(200).json(response_1.default.success({ result }));
    }
    catch (err) {
        return res.status(400).json(response_1.default.error.catchError());
    }
};
const login = async (req, res) => {
    try {
        const userAgent = req.headers['user-agent'] || '';
        const data = res.locals.investingDiaryRequest;
        const result = await user_auth_service_1.default.login(data);
        result.userAgent = userAgent;
        return res.status(200).json(response_1.default.success({ result }));
    }
    catch (err) {
        return res.status(400).json(response_1.default.error.catchError());
    }
};
const controller = {
    checkEmailForAvoidDuplication,
    join,
    login,
};
module.exports = controller;
