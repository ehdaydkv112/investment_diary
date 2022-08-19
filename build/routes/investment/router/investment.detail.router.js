"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const investment_detail_controller_1 = __importDefault(require("../controller/investment.detail.controller"));
const userInfo_middleware_1 = __importDefault(require("../../../middlewares/userInfo.middleware"));
const investment_detail_interceptor_1 = __importDefault(require("../interceptor/investment.detail.interceptor"));
const router = (0, express_1.Router)();
router.get('/:diaryIdx', userInfo_middleware_1.default, investment_detail_controller_1.default.readInvestmentDiaryDetail);
router.delete('/:diaryDetailIdx', userInfo_middleware_1.default, investment_detail_controller_1.default.deleteInvestmentDiaryDetail);
router.post('/new/item', userInfo_middleware_1.default, investment_detail_interceptor_1.default.createInvestmentDetail, investment_detail_controller_1.default.createInvestmentDiaryDetail);
module.exports = router;
