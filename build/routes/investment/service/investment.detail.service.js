"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const database_1 = __importDefault(require("../../../database/database"));
const prismaClient_1 = __importDefault(require("../../../models/prismaClient"));
const readInvestmentDiaryDetail = async (diaryIdx) => {
    const [titleInfo, deatilInfo] = await Promise.all([
        database_1.default.investingDiaryTitle.select({
            diaryIdx,
        }),
        database_1.default.investingDiaryDetail.select({
            diaryIdx,
        }),
    ]);
    return {
        titleInfo,
        deatilInfo,
    };
};
const createInvestmentDiaryDetail = async (data) => {
    await database_1.default.investingDiaryDetail.insertOne({
        diaryIdx: data.diaryIdx,
        diaryEventName: data.diaryEventName,
        ticker: data.ticker,
        price: data.price,
    });
    return true;
};
const deleteInvestmentDiaryDetail = async (diaryDetailIdx) => {
    await prismaClient_1.default.$queryRaw `DELETE FROM investing_diary_detail WHERE diary_idx = ${diaryDetailIdx}`;
    return true;
};
const service = {
    readInvestmentDiaryDetail,
    createInvestmentDiaryDetail,
    deleteInvestmentDiaryDetail,
};
module.exports = service;
