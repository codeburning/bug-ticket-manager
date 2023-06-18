import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { validateJWTToken } from '../utils/jwt';
import { SessionPayload } from '../types/auth';
export interface CustomRequest extends Request {
  sessionTokenPayload?: SessionPayload;
}
export const sessionAuthValidator = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.headers?.['authorization'] || req.headers?.['Authorization'];
    /**
     * Will check is auth token exist in headers OR not and should be a beerer token
     */
    if (!token || typeof token !== 'string')
      throw new Error('Session auth token does not valid');
    const tokens = token.split(' ');
    // console.log(tokens);
    if (tokens?.[0].toLowerCase() !== 'bearer')
      throw new Error('Bearer token is allowed');
    const JWT_TOKEN = tokens?.[1];
    if (!JWT_TOKEN) throw new Error('Invalid session token');
    /**
     * Validate token
     */
    // console.log(JWT_TOKEN);
    const payload: string | JwtPayload = validateJWTToken(JWT_TOKEN, 'SESSION');
    if (typeof payload === 'string') throw new Error('Invalid auth token');
    const sessionPayload: SessionPayload = {
      email: payload?.['email'],
      id: payload?.['id'],
      role: payload?.['role'],
      accountId: payload?.['accountId'],
    };
    req.sessionTokenPayload = sessionPayload;
    next();
  } catch (e: any) {
    return res
      .status(401)
      .jsonp({ error: true, message: e?.['message'] || 'Unauthorized' });
  }
};
