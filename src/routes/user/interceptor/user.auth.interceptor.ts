import { RequestHandler } from 'express';
import { validateOrReject } from 'class-validator';
import UserValidator from '../validator/user';

const userValidate: RequestHandler = async (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  const userValidator = new UserValidator(userEmail, userPassword);
  await validateOrReject(userValidator)
    .then(() => {
      res.locals.investingDiaryRequest = { userEmail, userPassword };
      next();
    })
    .catch((errors) => {
      return res.status(400).json({ msg: 'type error T^T', err: errors });
    });
};

const interceptor = {
  userValidate,
};

export = interceptor;
