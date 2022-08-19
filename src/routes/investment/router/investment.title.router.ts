import { Router } from 'express';
import controller from '../controller/investment.title.controller';
import userAuthMiddleWare from '../../../middlewares/userInfo.middleware';
import interceptor from '../interceptor/investment.title.interceptor';

const router: Router = Router();

router.post('/new', userAuthMiddleWare, interceptor.createInvestmentTitle, controller.createInvestmentDiary);
router.get('/list', userAuthMiddleWare, controller.readInvestmentDiaryList);
router.delete('/:diaryIdx', userAuthMiddleWare, controller.deleteInvestmentDiary);
// 삭제
// 업데이트

export = router;
