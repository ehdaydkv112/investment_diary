"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const user_auth_controller_1 = __importDefault(require("../controller/user.auth.controller"));
const user_email_interceptor_1 = __importDefault(require("../interceptor/user.email.interceptor"));
const user_auth_interceptor_1 = __importDefault(require("../interceptor/user.auth.interceptor"));
const router = (0, express_1.Router)();
router.post('/checking/email', user_email_interceptor_1.default.emailValidate, user_auth_controller_1.default.checkEmailForAvoidDuplication);
router.post('/join', user_auth_interceptor_1.default.userValidate, user_auth_controller_1.default.join);
router.post('/login', user_auth_interceptor_1.default.userValidate, user_auth_controller_1.default.login);
module.exports = router;
