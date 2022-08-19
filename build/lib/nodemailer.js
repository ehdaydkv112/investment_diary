"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const send = async (data) => {
    const transporter = nodemailer_1.default.createTransport({
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
module.exports = nodemail;
