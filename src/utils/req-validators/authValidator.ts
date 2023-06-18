import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

/**
 * Register end point validators
 */
export const registerValidator = [
  body('email').isEmail(),
  body('password').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),
  body('firstName').isAlpha(),
  body('lastName').isAlpha(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res.status(400).json({ error: true, details: error });
    }
    next();
  },
];

export const loginValidator = [
  body('email').isEmail(),
  body('password').isString(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res.status(400).json({ error: true, details: error });
    }
    next();
  },
];
