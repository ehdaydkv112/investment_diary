import crypto from 'crypto';

const makeCertificateCode = async () => {
  return crypto.randomBytes(3).toString('hex');
};

const makePassword = async (userPassword: string) => {
  return crypto.createHash('sha512').update(userPassword).digest('base64');
};

const cryptos = {
  makeCertificateCode,
  makePassword,
};

export = cryptos;
