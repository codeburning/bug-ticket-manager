import { SessionPayload } from '../../types/auth';
import * as jwt from 'jsonwebtoken';
const PRIVATE_KEY = 'ABC_DEF_GH_IJKL_MNOP_QRST!@#';
export const generateToken = (payload: SessionPayload) => {
  return jwt.sign(payload, PRIVATE_KEY, { expiresIn: '12h' });
};

export const generateRefreshToken = (payload: SessionPayload) => {
  return jwt.sign(payload, `REFRESH_${PRIVATE_KEY}`, { expiresIn: '30d' });
};

export const validateJWTToken = (token: string, type: 'SESSION' | 'REFRESH') => {
  const key = type === 'SESSION' ? PRIVATE_KEY : `REFRESH_${PRIVATE_KEY}`;
  return jwt.verify(token, key);
};
