"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const crypto_1 = __importDefault(require("../../../lib/crypto"));
const nodemailer_1 = __importDefault(require("../../../lib/nodemailer"));
const database_1 = __importDefault(require("../../../database/database"));
const sendEmailCertificationCode = async (data) => {
    const certificateCodeFromMySqlForDuplicatePrevention = await database_1.default.mailCode.select({
        userEmail: data.userEmail,
    });
    if (certificateCodeFromMySqlForDuplicatePrevention.length) {
        await database_1.default.mailCode.delete({
            userEmail: data.userEmail,
        });
    }
    const certificateCode = await crypto_1.default.makeCertificateCode();
    await database_1.default.mailCode.insertOne({ userEmail: data.userEmail, certificateCode });
    await nodemailer_1.default.send({
        userEmail: data.userEmail,
        certificateCode,
    });
    return true;
};
const checkCertificationCodeFromEmail = async (data) => {
    const result = await database_1.default.mailCode.select({
        userEmail: data.userEmail,
        certificateCode: data.certificateCode,
    });
    if (result.length)
        return true;
    return false;
};
const service = {
    checkCertificationCodeFromEmail,
    sendEmailCertificationCode,
};
module.exports = service;
