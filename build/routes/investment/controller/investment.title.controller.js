"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const response_1 = __importDefault(require("../../../common/response/response"));
const investment_title_service_1 = __importDefault(require("../service/investment.title.service"));
const createInvestmentDiary = async (req, res) => {
    try {
        const data = res.locals.investingDiaryRequest;
        const userInfoFromLocal = res.locals.userInfo;
        const result = await investment_title_service_1.default.createInvestmentDiary(userInfoFromLocal, data);
        return res.status(200).json(response_1.default.success({ result }));
    }
    catch (err) {
        return res.status(400).json(response_1.default.error.catchError());
    }
};
const readInvestmentDiaryList = async (req, res) => {
    try {
        const userInfoFromLocal = res.locals.userInfo;
        const result = (await investment_title_service_1.default.readInvestmentDiaryList(userInfoFromLocal));
        return res.status(200).json(response_1.default.success({ result }));
    }
    catch (err) {
        return res.status(400).json(response_1.default.error.catchError());
    }
};
const deleteInvestmentDiary = async (req, res) => {
    try {
        const { diaryIdx } = req.params;
        const userInfoFromLocal = res.locals.userInfo;
        const result = await investment_title_service_1.default.deleteInvestmentDiary(userInfoFromLocal, Number(diaryIdx));
        return res.status(200).json(response_1.default.success({ result }));
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(response_1.default.error.catchError());
    }
};
const controller = {
    createInvestmentDiary,
    readInvestmentDiaryList,
    deleteInvestmentDiary,
};
module.exports = controller;
