import { RequestHandler } from 'express';
import { validateOrReject } from 'class-validator';
import EmailValidator from '../validator/email';
import CertificateCodeValidator from '../validator/certificateCode';

const emailValidate: RequestHandler = async (req, res, next) => {
  const { userEmail } = req.body;
  const userValidator = new EmailValidator(userEmail);
  await validateOrReject(userValidator)
    .then(() => {
      res.locals.investingDiaryRequest = { userEmail };
      next();
    })
    .catch((errors) => {
      return res.status(400).json({ msg: 'type error T^T', err: errors });
    });
};

const certificateCodeValidate: RequestHandler = async (req, res, next) => {
  const { userEmail, certificateCode } = req.body;
  const certificateCodeValidator = new CertificateCodeValidator(userEmail, certificateCode);
  await validateOrReject(certificateCodeValidator)
    .then(() => {
      res.locals.investingDiaryRequest = { userEmail, certificateCode };
      next();
    })
    .catch((errors) => {
      return res.status(400).json({ msg: 'type error T^T', err: errors });
    });
};

const interceptor = {
  emailValidate,
  certificateCodeValidate,
};

export = interceptor;
