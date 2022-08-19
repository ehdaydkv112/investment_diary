"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_email_router_1 = __importDefault(require("./user/router/user.email.router"));
const user_auth_router_1 = __importDefault(require("./user/router/user.auth.router"));
const investment_title_router_1 = __importDefault(require("./investment/router/investment.title.router"));
const investment_detail_router_1 = __importDefault(require("./investment/router/investment.detail.router"));
const router = express_1.default.Router();
router.use('/user/email', user_email_router_1.default);
router.use('/user/auth', user_auth_router_1.default);
router.use('/investment/title', investment_title_router_1.default);
router.use('/investment/detail', investment_detail_router_1.default);
module.exports = router;
