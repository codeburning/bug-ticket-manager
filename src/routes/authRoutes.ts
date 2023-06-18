import { Router } from 'express';
import { AuthController } from '../controller/authController';
import {
  loginValidator,
  registerValidator,
} from '../utils/req-validators/authValidator';
const authController = new AuthController();
const authRoutes = Router();
//Login Routes
authRoutes.post('/login', loginValidator, authController.login);
//Register Routes
authRoutes.post('/register', registerValidator, authController.register);
//Forget password
authRoutes.post('/forget-password', authController.forgetPasswordRequest);

export default authRoutes;
