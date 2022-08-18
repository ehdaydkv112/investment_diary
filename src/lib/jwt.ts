import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';

const makeToken = async (userIdx: number, durationDay: number) => {
  const payload = {
    userIdx,
    exp: Date.now() / 1000 + 60 * 60 * 24 * durationDay,
    iat: Date.now() / 1000,
  };
  return jsonwebtoken.sign(payload, `${process.env.JWT_YAHO}`);
};

const verifyToken = async (token: string) => {
  return jsonwebtoken.verify(token, `${process.env.JWT_YAHO}`);
};

const jwt = {
  makeToken,
  verifyToken,
};

export = jwt;
