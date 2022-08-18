import { Router } from 'express';
import controller from '../controller/investment.detail.controller';
import userAuthMiddleWare from '../../../middlewares/userInfo.middleware';
import interceptor from '../interceptor/investment.detail.interceptor';

const router: Router = Router();

router.get('/:diaryIdx', userAuthMiddleWare, controller.readInvestmentDiaryDetail);
router.delete('/:diaryDetailIdx', userAuthMiddleWare, controller.deleteInvestmentDiaryDetail);
router.post(
  '/new/item',
  userAuthMiddleWare,
  interceptor.createInvestmentDetail,
  controller.createInvestmentDiaryDetail,
);

export = router;
