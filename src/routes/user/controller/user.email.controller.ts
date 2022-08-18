import { RequestHandler } from 'express';
import response from '../../../common/response/response';
import service from '../service/user.email.service';
import MailCodeInterface from '../../../interface/mailCode.interface';

const sendEmailCertificationCode: RequestHandler = async (req, res) => {
  try {
    const data: MailCodeInterface = res.locals.investingDiaryRequest;
    const result: boolean = await service.sendEmailCertificationCode(data);
    return res.status(200).json(response.success({ result }));
  } catch (err) {
    return res.status(400).json(response.error.catchError());
  }
};

const checkEmailCertificationCode: RequestHandler = async (req, res) => {
  try {
    const data: MailCodeInterface = res.locals.investingDiaryRequest;
    const result: boolean = await service.checkCertificationCodeFromEmail(data);
    if (!result) return res.status(200).json(response.error.customError('none', false));
    return res.status(200).json(response.success({ result }));
  } catch (err) {
    return res.status(400).json(response.error.catchError());
  }
};

const controller = {
  checkEmailCertificationCode,
  sendEmailCertificationCode,
};

export = controller;
