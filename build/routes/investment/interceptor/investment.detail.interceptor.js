"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const class_validator_1 = require("class-validator");
const createDetail_1 = __importDefault(require("../validator/createDetail"));
const createInvestmentDetail = async (req, res, next) => {
    const { diaryIdx, ticker, diaryEventName, price } = req.body;
    const createInvestMentTitleValidator = new createDetail_1.default(diaryIdx, ticker, diaryEventName, price);
    await (0, class_validator_1.validateOrReject)(createInvestMentTitleValidator)
        .then(() => {
        res.locals.investingDiaryRequest = { diaryIdx, ticker, diaryEventName, price };
        next();
    })
        .catch((errors) => {
        return res.status(400).json({ msg: 'type error T^T', err: errors });
    });
};
const interceptor = {
    createInvestmentDetail,
};
module.exports = interceptor;
