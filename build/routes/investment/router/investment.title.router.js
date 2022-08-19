"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const investment_title_controller_1 = __importDefault(require("../controller/investment.title.controller"));
const userInfo_middleware_1 = __importDefault(require("../../../middlewares/userInfo.middleware"));
const investment_title_interceptor_1 = __importDefault(require("../interceptor/investment.title.interceptor"));
const router = (0, express_1.Router)();
router.post('/new', userInfo_middleware_1.default, investment_title_interceptor_1.default.createInvestmentTitle, investment_title_controller_1.default.createInvestmentDiary);
router.get('/list', userInfo_middleware_1.default, investment_title_controller_1.default.readInvestmentDiaryList);
router.delete('/:diaryIdx', userInfo_middleware_1.default, investment_title_controller_1.default.deleteInvestmentDiary);
module.exports = router;
