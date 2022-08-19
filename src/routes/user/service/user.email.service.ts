import libCryptos from '../../../lib/crypto';
import libNodemail from '../../../lib/nodemailer';
import database from '../../../database/database';
import MailCodeInterface from '../../../interface/mailCode.interface';

const sendEmailCertificationCode = async (data: MailCodeInterface) => {
  const certificateCodeFromMySqlForDuplicatePrevention = await database.mailCode.select<MailCodeInterface>({
    userEmail: data.userEmail,
  });

  if (certificateCodeFromMySqlForDuplicatePrevention.length) {
    await database.mailCode.delete<MailCodeInterface>({
      userEmail: data.userEmail,
    });
  }

  const certificateCode = await libCryptos.makeCertificateCode();
  await database.mailCode.insertOne<MailCodeInterface>({ userEmail: data.userEmail, certificateCode });
  await libNodemail.send({
    userEmail: data.userEmail,
    certificateCode,
  });
  return true;
};

const checkCertificationCodeFromEmail = async (data: MailCodeInterface) => {
  const result = await database.mailCode.select<MailCodeInterface>({
    userEmail: data.userEmail,
    certificateCode: data.certificateCode,
  });
  if (result.length) return true;
  return false;
};

const service = {
  checkCertificationCodeFromEmail,
  sendEmailCertificationCode,
};

export = service;
