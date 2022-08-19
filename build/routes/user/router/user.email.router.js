"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const user_email_controller_1 = __importDefault(require("../controller/user.email.controller"));
const user_email_interceptor_1 = __importDefault(require("../interceptor/user.email.interceptor"));
const router = (0, express_1.Router)();
router.post('/certification/code/send', user_email_interceptor_1.default.emailValidate, user_email_controller_1.default.sendEmailCertificationCode);
router.post('/certification/code/check', user_email_interceptor_1.default.certificateCodeValidate, user_email_controller_1.default.checkEmailCertificationCode);
module.exports = router;
