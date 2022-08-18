import { RequestHandler } from 'express';
import response from '../../../common/response/response';
import EventArrayIntrface from '../../../interface/eventArray.interface';
import service from '../service/investment.detail.service';

const readInvestmentDiaryDetail: RequestHandler = async (req, res) => {
  try {
    const { diaryIdx } = req.params;
    const result = await service.readInvestmentDiaryDetail(Number(diaryIdx));
    return res.status(200).json(response.success({ result }));
  } catch (err) {
    return res.status(400).json(response.error.catchError());
  }
};

const createInvestmentDiaryDetail: RequestHandler = async (req, res) => {
  try {
    const data: EventArrayIntrface = res.locals.investingDiaryRequest;
    const result = await service.createInvestmentDiaryDetail(data);
    return res.status(200).json(response.success({ result }));
  } catch (err) {
    return res.status(400).json(response.error.catchError());
  }
};

const deleteInvestmentDiaryDetail: RequestHandler = async (req, res) => {
  try {
    const { diaryDetailIdx } = req.params;
    const result = await service.deleteInvestmentDiaryDetail(Number(diaryDetailIdx));
    return res.status(200).json(response.success({ result }));
  } catch (err) {
    return res.status(400).json(response.error.catchError());
  }
};

const controller = {
  readInvestmentDiaryDetail,
  createInvestmentDiaryDetail,
  deleteInvestmentDiaryDetail,
};

export = controller;
