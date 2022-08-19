/* eslint-disable camelcase */
import { user_info } from '@prisma/client';
import UserInfoInterface from '../../../interface/userInfo.interface';
import database from '../../../database/database';
import InvestmentTitleInterface from '../../../interface/invesmentTitle.interface';
import InvestmentDetailInterface from '../../../interface/invesmentDetail.interface';
import EventArrayIntrface from '../../../interface/eventArray.interface';
import prismaClient from '../../../models/prismaClient';

const readInvestmentDiaryDetail = async (diaryIdx: number) => {
  const [titleInfo, deatilInfo] = await Promise.all([
    database.investingDiaryTitle.select<InvestmentTitleInterface>({
      diaryIdx,
    }),
    database.investingDiaryDetail.select<InvestmentDetailInterface>({
      diaryIdx,
    }),
  ]);

  return {
    titleInfo,
    deatilInfo,
  };
};

const createInvestmentDiaryDetail = async (data: EventArrayIntrface) => {
  await database.investingDiaryDetail.insertOne<InvestmentDetailInterface>({
    diaryIdx: data.diaryIdx,
    diaryEventName: data.diaryEventName,
    ticker: data.ticker,
    price: data.price,
  });
  return true;
};

const deleteInvestmentDiaryDetail = async (diaryDetailIdx: number) => {
  await prismaClient.$queryRaw`DELETE FROM investing_diary_detail WHERE diary_idx = ${diaryDetailIdx}`;
  return true;
};

const service = {
  readInvestmentDiaryDetail,
  createInvestmentDiaryDetail,
  deleteInvestmentDiaryDetail,
};

export = service;
