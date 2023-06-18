// Team creation request body validator

import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Types } from 'mongoose';
export const teamBodyValidator = [
  body('name').isString().withMessage('Should be a valid string'),
  body('manager').isMongoId().withMessage('Should be a valid manager Id'),
  body('members')
    .isArray()
    .custom((_, { req }) => {
      const members: Array<any> = req.body.members || [];
      members.forEach((e) => {
        // console.log(e);
        if (!Types.ObjectId.isValid(e))
          throw new Error(`${e} is not a valid mongo ObjectId`);
      });
      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res.status(400).json({ error: true, details: error });
    }
    next();
  },
];

// export const getTQuery
