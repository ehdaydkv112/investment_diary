import { RequestHandler } from 'express';
import { validateOrReject } from 'class-validator';
import CreateInvestmentDetail from '../validator/createDetail';

const createInvestmentDetail: RequestHandler = async (req, res, next) => {
  const { diaryIdx, ticker, diaryEventName, price } = req.body;
  const createInvestMentTitleValidator = new CreateInvestmentDetail(diaryIdx, ticker, diaryEventName, price);
  await validateOrReject(createInvestMentTitleValidator)
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

export = interceptor;
