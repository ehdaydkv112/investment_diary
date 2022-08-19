import express from 'express';
import userEmailRouter from './user/router/user.email.router';
import userAuthRouter from './user/router/user.auth.router';
import investmentTitleRouter from './investment/router/investment.title.router';
import investmentDetailRouter from './investment/router/investment.detail.router';

const router = express.Router();

router.use('/user/email', userEmailRouter);
router.use('/user/auth', userAuthRouter);
router.use('/investment/title', investmentTitleRouter);
router.use('/investment/detail', investmentDetailRouter);

export = router;
