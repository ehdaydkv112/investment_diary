import { Router } from 'express';
import controller from '../controller/user.auth.controller';
import emailInterceptor from '../interceptor/user.email.interceptor';
import userInterceptor from '../interceptor/user.auth.interceptor';

const router: Router = Router();

router.post('/checking/email', emailInterceptor.emailValidate, controller.checkEmailForAvoidDuplication);
router.post('/join', userInterceptor.userValidate, controller.join);
router.post('/login', userInterceptor.userValidate, controller.login);
// router.post('/login/refresh', emailInterceptor.certificateCodeValidate, controller.checkEmailCertificationCode);

export = router;
