import { Request, Response } from 'express';
import {
  AuthLogin,
  AuthRegister,
  RegisterNewUser,
  SessionPayload,
} from '../types/auth';
import { UserService } from '../services/userService';
import { compareBcryptHash, createBcryptHash } from '../utils/bcrypt';
import { generateRefreshToken, generateToken } from '../utils/jwt';
import { getAccountId, getUserAvatarColor } from '../utils/string-handler';
const userService = new UserService();
export class AuthController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  async login(req: Request, res: Response) {
    try {
      const body: AuthLogin = req.body;
      const data = await userService.getUserProfileByEmail(body.email);
      if (!data)
        return res
          .status(404)
          .json({ error: true, message: 'Profile not found' });
      //Check is password is correct
      const flag = compareBcryptHash(body.password, data.password);
      if (!flag) throw new Error('Auth failed');
      /**
       * Generate Token [Session token , Refresh token]
       */
      const payload: SessionPayload = {
        email: data.email,
        id: data._id.toString(),
        role: data.role || 'USER',
        accountId: data.accountId || '',
      };
      const session = generateToken(payload);
      const refresh = generateRefreshToken(payload);
      //   delete data['password'];
      return res.json({
        token: { session, refresh },
        user: { ...data, password: undefined },
      });
    } catch (e: any) {
      return res
        .status(400)
        .jsonp({ error: true, message: e.message || 'API error' });
    }
  }
  /**
   * Step 1 - check is this email passed in body is already used
   * @param req
   * @param res
   * @returns
   */
  async register(req: Request, res: Response) {
    try {
      const body: AuthRegister = req.body;
      const data = await userService.getUserProfileByEmail(body.email);
      if (data) throw new Error('Email is already used');
      body.password = createBcryptHash(body.password);
      const avatarColor = getUserAvatarColor();
      const accountId = getAccountId();
      const x: RegisterNewUser = {
        ...body,
        userAvatar: avatarColor,
        role: 'ADMIN',
        accountId: accountId,
      };
      await userService.newUserCreation(x);
      return res.json({
        error: false,
        message: 'Profile registration was successful ',
      });
      // return res.json(x);
    } catch (e: any) {
      return res
        .status(400)
        .jsonp({ error: true, message: e.message || 'API error' });
    }
  }
  async forgetPasswordRequest(req: Request, res: Response) {}
}
