/* eslint-disable camelcase */
import { RequestHandler } from 'express';
import { user_info } from '@prisma/client';
import response from '../common/response/response';
import libJwt from '../lib/jwt';
import database from '../database/database';
import UserInfoInterface from '../interface/userInfo.interface';

const accessTokenTypeCheck = async (authorization: string | string[]) => {
  if (typeof authorization === 'string') {
    const [accessTokenType, accessTokenValue] = authorization.split(' ');
    if (accessTokenType !== 'Bearer') return '';
    return accessTokenValue;
  }
  return '';
};

const findUserInfo = async (verifyedAccessToken: any) => {
  const userInfo = (await database.userInfo.select<UserInfoInterface>({
    userIdx: verifyedAccessToken.user_idx,
  })) as user_info[];
  if (userInfo.length) {
    return {
      result: true,
      data: userInfo[0],
    };
  }
  return {
    result: false,
    data: {},
  };
};

const userAuthMiddleWare: RequestHandler = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(201).json(response.error.customError('noneHead', {}));

    const accessTokenValue = await accessTokenTypeCheck(authorization);
    if (accessTokenValue === '') return res.status(201).json(response.error.customError('TypeIncorrect', {}));

    const verifyedAccessToken: any = await libJwt.verifyToken(accessTokenValue);
    const userInfo = await findUserInfo(verifyedAccessToken);

    if (userInfo.result) res.locals.userInfo = userInfo.result;
    else return res.status(201).json(response.error.customError('noneUserInfo', {}));

    return next();
  } catch (err) {
    return res.status(400).json(response.error.catchError());
  }
};

export = userAuthMiddleWare;
