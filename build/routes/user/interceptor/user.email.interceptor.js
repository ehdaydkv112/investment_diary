"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const class_validator_1 = require("class-validator");
const email_1 = __importDefault(require("../validator/email"));
const certificateCode_1 = __importDefault(require("../validator/certificateCode"));
const emailValidate = async (req, res, next) => {
    const { userEmail } = req.body;
    const userValidator = new email_1.default(userEmail);
    await (0, class_validator_1.validateOrReject)(userValidator)
        .then(() => {
        res.locals.investingDiaryRequest = { userEmail };
        next();
    })
        .catch((errors) => {
        return res.status(400).json({ msg: 'type error T^T', err: errors });
    });
};
const certificateCodeValidate = async (req, res, next) => {
    const { userEmail, certificateCode } = req.body;
    const certificateCodeValidator = new certificateCode_1.default(userEmail, certificateCode);
    await (0, class_validator_1.validateOrReject)(certificateCodeValidator)
        .then(() => {
        res.locals.investingDiaryRequest = { userEmail, certificateCode };
        next();
    })
        .catch((errors) => {
        return res.status(400).json({ msg: 'type error T^T', err: errors });
    });
};
const interceptor = {
    emailValidate,
    certificateCodeValidate,
};
module.exports = interceptor;
