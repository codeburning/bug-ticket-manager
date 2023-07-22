import { Router } from 'express';
import { UserController } from '../controller/userController';
import {
  getUsersQueryValidator,
  createUserBodyValidator,
} from '../utils/req-validators/user';
const userController = new UserController();
// export const user
const userRoutes = Router();

userRoutes.get('/', getUsersQueryValidator, userController.handleGetUsers);
userRoutes.post(
  '/',
  createUserBodyValidator,
  userController.handleUserCreation,
);

export default userRoutes;
