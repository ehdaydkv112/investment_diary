/* eslint-disable camelcase */
import { user_info } from '@prisma/client';
import UserInfoInterface from '../../../interface/userInfo.interface';
import database from '../../../database/database';
import libCryptro from '../../../lib/crypto';
import libJwt from '../../../lib/jwt';
import MailCodeInterface from '../../../interface/mailCode.interface';

const checkEmail = async (data: UserInfoInterface) => {
  const userEmailFromMySqlForDuplicatePrevention = await database.userInfo.select({
    userEmail: data.userEmail,
  });
  if (!userEmailFromMySqlForDuplicatePrevention.length) return true;
  return false;
};

const join = async (data: UserInfoInterface) => {
  const userInfo = await database.userInfo.select<UserInfoInterface>({
    userEmail: data.userEmail,
  });
  if (userInfo.length) return false;

  await database.mailCode.delete<MailCodeInterface>({
    userEmail: data.userEmail,
  });
  const hashedUserPassword = await libCryptro.makePassword(data.userPassword || '');
  await database.userInfo.insertOne({
    userEmail: data.userEmail,
    userPassword: hashedUserPassword,
  });
  return true;
};

const login = async (data: UserInfoInterface) => {
  const hashedUserPassword = await libCryptro.makePassword(data.userPassword || '');
  const userInfo = (await database.userInfo.select<UserInfoInterface>({
    userEmail: data.userEmail,
    userPassword: hashedUserPassword,
  })) as user_info[];

  const result = {
    loginResult: false,
    accessToken: '',
    refreshToken: '',
    userAgent: '',
  };

  if (userInfo.length) {
    result.loginResult = true;
    result.accessToken = await libJwt.makeToken(userInfo[0].user_idx, 1);
    result.refreshToken = await libJwt.makeToken(userInfo[0].user_idx, 30);
  }
  return result;
};

const service = {
  checkEmail,
  join,
  login,
};

export = service;
