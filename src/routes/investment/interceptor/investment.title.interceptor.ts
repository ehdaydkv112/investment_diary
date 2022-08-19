import { RequestHandler } from 'express';
import { validateOrReject } from 'class-validator';
import CreateInvestmentTitle from '../validator/createTitle';
import InvestmentTitle from '../validator/investmentTitle';

const createInvestmentTitle: RequestHandler = async (req, res, next) => {
  const { diaryName, content, eventArray } = req.body;
  const createInvestMentTitleValidator = new CreateInvestmentTitle(diaryName, content, eventArray);
  await validateOrReject(createInvestMentTitleValidator)
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

export = interceptor;
