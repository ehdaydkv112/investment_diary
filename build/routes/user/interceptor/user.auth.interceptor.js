"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const class_validator_1 = require("class-validator");
const user_1 = __importDefault(require("../validator/user"));
const userValidate = async (req, res, next) => {
    const { userEmail, userPassword } = req.body;
    const userValidator = new user_1.default(userEmail, userPassword);
    await (0, class_validator_1.validateOrReject)(userValidator)
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
module.exports = interceptor;
