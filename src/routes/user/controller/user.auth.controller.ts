import { RequestHandler } from 'express';
import response from '../../../common/response/response';
import UserInfoInterface from '../../../interface/userInfo.interface';
import service from '../service/user.auth.service';
import { LoginResult } from '../types/loginResult';

const checkEmailForAvoidDuplication: RequestHandler = async (req, res) => {
  try {
    const data: UserInfoInterface = res.locals.investingDiaryRequest;
    const result: boolean = await service.checkEmail(data);
    return res.status(200).json(response.success({ result }));
  } catch (err) {
    return res.status(400).json(response.error.catchError());
  }
};

const join: RequestHandler = async (req, res) => {
  try {
    const data: UserInfoInterface = res.locals.investingDiaryRequest;
    const result: boolean = await service.join(data);
    return res.status(200).json(response.success({ result }));
  } catch (err) {
    return res.status(400).json(response.error.catchError());
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const userAgent = req.headers['user-agent'] || '';
    const data: UserInfoInterface = res.locals.investingDiaryRequest;
    const result: LoginResult = await service.login(data);
    result.userAgent = userAgent;
    return res.status(200).json(response.success({ result }));
  } catch (err) {
    return res.status(400).json(response.error.catchError());
  }
};

const controller = {
  checkEmailForAvoidDuplication,
  join,
  login,
};

export = controller;
