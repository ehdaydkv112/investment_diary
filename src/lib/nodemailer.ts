import nodemailer from 'nodemailer';
import MailCodeInterface from '../interface/mailCode.interface';
import 'dotenv/config';

const send = async (data: MailCodeInterface) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PW,
    },
  });

  transporter.sendMail({
    from: process.env.MAIL_ID,
    to: data.userEmail,
    subject: 'Message good',
    text: `여기 >> ${data.certificateCode} << 코드가 있어요`,
  });
  return true;
};

const nodemail = {
  send,
};

export = nodemail;
