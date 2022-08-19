"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const response_1 = __importDefault(require("../../../common/response/response"));
const user_email_service_1 = __importDefault(require("../service/user.email.service"));
const sendEmailCertificationCode = async (req, res) => {
    try {
        const data = res.locals.investingDiaryRequest;
        const result = await user_email_service_1.default.sendEmailCertificationCode(data);
        return res.status(200).json(response_1.default.success({ result }));
    }
    catch (err) {
        return res.status(400).json(response_1.default.error.catchError());
    }
};
const checkEmailCertificationCode = async (req, res) => {
    try {
        const data = res.locals.investingDiaryRequest;
        const result = await user_email_service_1.default.checkCertificationCodeFromEmail(data);
        if (!result)
            return res.status(200).json(response_1.default.error.customError('none', false));
        return res.status(200).json(response_1.default.success({ result }));
    }
    catch (err) {
        return res.status(400).json(response_1.default.error.catchError());
    }
};
const controller = {
    checkEmailCertificationCode,
    sendEmailCertificationCode,
};
module.exports = controller;
