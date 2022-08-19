"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const database_1 = __importDefault(require("../../../database/database"));
const prismaClient_1 = __importDefault(require("../../../models/prismaClient"));
const createInvestmentDiary = async (userInfoFromLocal, data) => {
    const userInfo = (await database_1.default.userInfo.select({
        userIdx: userInfoFromLocal.userIdx,
    }));
    await database_1.default.investingDiaryTitle.insertOne({
        userIdx: userInfo[0].user_idx,
        diaryName: data.diaryName,
        content: data.content,
    });
    const diaryIdx = await prismaClient_1.default.$queryRaw `SELECT LAST_INSERT_ID() AS diary_idx;`;
    const eventArray = data.eventArray;
    for (let i = 0; i < eventArray.length; i += 1) {
        eventArray[i].diaryIdx = Number(diaryIdx[0].diary_idx);
    }
    await database_1.default.investingDiaryDetail.insertMany(eventArray);
    return true;
};
const readInvestmentDiaryList = async (userInfoFromLocal) => {
    const userInfo = (await database_1.default.userInfo.select({
        userIdx: userInfoFromLocal.userIdx,
    }));
    return database_1.default.investingDiaryTitle.select({
        userIdx: userInfo[0].user_idx,
    });
};
const deleteInvestmentDiary = async (userInfoFromLocal, diaryIdx) => {
    const checkMyDiaryBeforeDelete = await database_1.default.investingDiaryTitle.select({
        userIdx: userInfoFromLocal.userIdx,
        diaryIdx,
    });
    if (checkMyDiaryBeforeDelete.length < 0)
        return false;
    await Promise.all([
        prismaClient_1.default.$queryRaw `DELETE FROM investing_diary_title WHERE diary_idx = ${diaryIdx}`,
        prismaClient_1.default.$queryRaw `DELETE FROM investing_diary_detail WHERE diary_idx = ${diaryIdx}`,
    ]);
    return true;
};
const service = {
    createInvestmentDiary,
    readInvestmentDiaryList,
    deleteInvestmentDiary,
};
module.exports = service;
