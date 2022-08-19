/* eslint-disable camelcase */
import { RequestHandler } from 'express';
import { investing_diary_title } from '@prisma/client';
import response from '../../../common/response/response';
import service from '../service/investment.title.service';
import CreateInvesmentInterface from '../../../interface/createInvesment.interface';
import UserInfoInterface from '../../../interface/userInfo.interface';

const createInvestmentDiary: RequestHandler = async (req, res) => {
  try {
    const data: CreateInvesmentInterface = res.locals.investingDiaryRequest;
    const userInfoFromLocal: UserInfoInterface = res.locals.userInfo;
    const result: boolean = await service.createInvestmentDiary(userInfoFromLocal, data);
    return res.status(200).json(response.success({ result }));
  } catch (err) {
    return res.status(400).json(response.error.catchError());
  }
};

const readInvestmentDiaryList: RequestHandler = async (req, res) => {
  try {
    const userInfoFromLocal: UserInfoInterface = res.locals.userInfo;
    const result = (await service.readInvestmentDiaryList(userInfoFromLocal)) as investing_diary_title[];
    return res.status(200).json(response.success({ result }));
  } catch (err) {
    return res.status(400).json(response.error.catchError());
  }
};

const deleteInvestmentDiary: RequestHandler = async (req, res) => {
  try {
    const { diaryIdx } = req.params;
    const userInfoFromLocal: UserInfoInterface = res.locals.userInfo;
    const result: boolean = await service.deleteInvestmentDiary(userInfoFromLocal, Number(diaryIdx));
    return res.status(200).json(response.success({ result }));
  } catch (err) {
    console.log(err);
    return res.status(400).json(response.error.catchError());
  }
};

const controller = {
  createInvestmentDiary,
  readInvestmentDiaryList,
  deleteInvestmentDiary,
};

export = controller;
