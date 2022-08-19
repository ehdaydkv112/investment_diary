import { Router } from 'express';
import controller from '../controller/user.email.controller';
import emailInterceptor from '../interceptor/user.email.interceptor';

const router: Router = Router();

router.post('/certification/code/send', emailInterceptor.emailValidate, controller.sendEmailCertificationCode);
router.post(
  '/certification/code/check',
  emailInterceptor.certificateCodeValidate,
  controller.checkEmailCertificationCode,
);

export = router;
