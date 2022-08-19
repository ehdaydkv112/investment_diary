"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const aws_sdk_1 = __importDefault(require("aws-sdk"));
require("dotenv/config");
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-east-1',
});
const ses = new aws_sdk_1.default.SES({
    apiVersion: '2010-12-01',
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID || '',
        secretAccessKey: process.env.AWS_SECRET_KEY || '',
    },
});
module.exports = ses;
