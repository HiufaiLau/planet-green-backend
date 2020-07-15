import express from 'express';
import { currentUser } from '../middlewares/current-user.js';
import { validateRequest } from '../middlewares/validate-request.js';

import { me, signup, signin, signout } from '../controllers/auth.js';

import {
  signupValidation,
  siginValidation,
} from '../validation/auth-validation.js';

const router = express.Router();

router.route('/me').get(currentUser, me);
router.route('/signup').post(signupValidation, validateRequest, signup);
router.route('/signin').post(siginValidation, validateRequest, signin);
router.route('/signout').post(signout);

export { router as authRouter };
