import { NextFunction, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';
import { Types } from 'mongoose';

export const validateTicketRequestBody = [
  body('title').isString(),
  body('description').isString(),
  body('notes').isString().optional(),
  body('assignedTeam')
    .isArray()
    .custom((_, { req }) => {
      const assignedTeam: Array<any> = req.body?.['assignedTeam'] || [];
      if (assignedTeam.length < 1)
        throw new Error('Please select at least one team');
      assignedTeam.forEach((e) => {
        if (Types.ObjectId.isValid(e) === false) {
          throw new Error(`Invalid team id passed ${e}`);
        }
      });
      return true;
    }),
  body('media')
    .isArray()
    .optional()
    .custom((_, { req }) => {
      const media: Array<string> | undefined = req.body?.['media'];
      if (media && media.length > 0) {
        media.forEach((u) => {
          //check is this u is valid URL
        });
      }
      return true;
    }),
  body('clientName').isString().optional(),
  body('clientEmail').isEmail().optional(),
  body('userName').isString().optional(),
  body('userMobile').isString().optional(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res.status(400).json({ error: true, details: error });
    }
    next();
  },
];

export const getTicketsQueryValidator = [
  query('team').isMongoId().optional(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res.status(400).json({ error: true, details: error });
    }
    next();
  },
];

export const validateTicketRequestBodyForUpdate = [
  body('title').isString().optional(),
  body('description').isString().optional(),
  body('notes').isString().optional(),
  body('assignedTeam')
    .isArray()
    .optional()
    .custom((_, { req }) => {
      const assignedTeam: Array<any> = req.body?.['assignedTeam'] || [];
      if (assignedTeam.length < 1)
        throw new Error('Please select at least one team');
      assignedTeam.forEach((e) => {
        if (Types.ObjectId.isValid(e) === false) {
          throw new Error(`Invalid team id passed ${e}`);
        }
      });
      return true;
    }),
  body('media')
    .isArray()
    .optional()
    .custom((_, { req }) => {
      const media: Array<string> | undefined = req.body?.['media'];
      if (media && media.length > 0) {
        media.forEach((u) => {
          //check is this u is valid URL
        });
      }
      return true;
    }),
  body('clientName').isString().optional(),
  body('clientEmail').isEmail().optional(),
  body('userName').isString().optional(),
  body('userMobile').isString().optional(),
  body("status").isString().optional(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res.status(400).json({ error: true, details: error });
    }
    next();
  },
];
