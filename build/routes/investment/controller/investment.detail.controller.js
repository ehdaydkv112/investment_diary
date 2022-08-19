"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const response_1 = __importDefault(require("../../../common/response/response"));
const investment_detail_service_1 = __importDefault(require("../service/investment.detail.service"));
const readInvestmentDiaryDetail = async (req, res) => {
    try {
        const { diaryIdx } = req.params;
        const result = await investment_detail_service_1.default.readInvestmentDiaryDetail(Number(diaryIdx));
        return res.status(200).json(response_1.default.success({ result }));
    }
    catch (err) {
        return res.status(400).json(response_1.default.error.catchError());
    }
};
const createInvestmentDiaryDetail = async (req, res) => {
    try {
        const data = res.locals.investingDiaryRequest;
        const result = await investment_detail_service_1.default.createInvestmentDiaryDetail(data);
        return res.status(200).json(response_1.default.success({ result }));
    }
    catch (err) {
        return res.status(400).json(response_1.default.error.catchError());
    }
};
const deleteInvestmentDiaryDetail = async (req, res) => {
    try {
        const { diaryDetailIdx } = req.params;
        const result = await investment_detail_service_1.default.deleteInvestmentDiaryDetail(Number(diaryDetailIdx));
        return res.status(200).json(response_1.default.success({ result }));
    }
    catch (err) {
        return res.status(400).json(response_1.default.error.catchError());
    }
};
const controller = {
    readInvestmentDiaryDetail,
    createInvestmentDiaryDetail,
    deleteInvestmentDiaryDetail,
};
module.exports = controller;
