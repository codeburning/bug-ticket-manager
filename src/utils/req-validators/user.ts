import { NextFunction, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';

export const getUsersQueryValidator = [
  query('page').isNumeric(),
  query('size').isNumeric(),
  query('search').isString().optional(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res.status(400).json({ error: true, details: error });
    }
    next();
  },
];
export const createUserBodyValidator = [
  body('firstName').isString(),
  body('lastName').isString(),
  body('email').isEmail(),
  body('password').isString().isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  // body("")
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res.status(400).json({ error: true, details: error });
    }
    next();
  },
];
