/* eslint-disable camelcase */
import { user_info } from '@prisma/client';
import UserInfoInterface from '../../../interface/userInfo.interface';
import database from '../../../database/database';
import CreateInvesmentInterface from '../../../interface/createInvesment.interface';
import prismaClient from '../../../models/prismaClient';
import InvestmentTitleInterface from '../../../interface/invesmentTitle.interface';

const createInvestmentDiary = async (userInfoFromLocal: UserInfoInterface, data: CreateInvesmentInterface) => {
  const userInfo = (await database.userInfo.select<UserInfoInterface>({
    userIdx: userInfoFromLocal.userIdx,
  })) as user_info[];

  await database.investingDiaryTitle.insertOne<CreateInvesmentInterface>({
    userIdx: userInfo[0].user_idx,
    diaryName: data.diaryName,
    content: data.content,
  });

  const diaryIdx: any = await prismaClient.$queryRaw`SELECT LAST_INSERT_ID() AS diary_idx;`;
  const eventArray = data.eventArray as [{ [key: string]: any }];

  for (let i = 0; i < eventArray.length; i += 1) {
    eventArray[i].diaryIdx = Number(diaryIdx[0].diary_idx);
  }

  await database.investingDiaryDetail.insertMany(eventArray);
  return true;
};

const readInvestmentDiaryList = async (userInfoFromLocal: UserInfoInterface) => {
  const userInfo = (await database.userInfo.select<UserInfoInterface>({
    userIdx: userInfoFromLocal.userIdx,
  })) as user_info[];

  return database.investingDiaryTitle.select<InvestmentTitleInterface>({
    userIdx: userInfo[0].user_idx,
  });
};

const deleteInvestmentDiary = async (userInfoFromLocal: UserInfoInterface, diaryIdx: number) => {
  const checkMyDiaryBeforeDelete = await database.investingDiaryTitle.select<InvestmentTitleInterface>({
    userIdx: userInfoFromLocal.userIdx,
    diaryIdx,
  });
  if (checkMyDiaryBeforeDelete.length < 0) return false;

  await Promise.all([
    prismaClient.$queryRaw`DELETE FROM investing_diary_title WHERE diary_idx = ${diaryIdx}`,
    prismaClient.$queryRaw`DELETE FROM investing_diary_detail WHERE diary_idx = ${diaryIdx}`,
  ]);

  return true;
};

const service = {
  createInvestmentDiary,
  readInvestmentDiaryList,
  deleteInvestmentDiary,
};

export = service;
