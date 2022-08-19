"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const class_validator_1 = require("class-validator");
const createTitle_1 = __importDefault(require("../validator/createTitle"));
const createInvestmentTitle = async (req, res, next) => {
    const { diaryName, content, eventArray } = req.body;
    const createInvestMentTitleValidator = new createTitle_1.default(diaryName, content, eventArray);
    await (0, class_validator_1.validateOrReject)(createInvestMentTitleValidator)
        .then(() => {
        res.locals.investingDiaryRequest = { diaryName, content, eventArray };
        next();
    })
        .catch((errors) => {
        return res.status(400).json({ msg: 'type error T^T', err: errors });
    });
};
const interceptor = {
    createInvestmentTitle,
};
module.exports = interceptor;
