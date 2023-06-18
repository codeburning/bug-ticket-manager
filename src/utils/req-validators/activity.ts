import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const activityRequestBodyValidator = [
  body('post').isString().optional(),
  body('media')
    .isArray()
    .custom((_, { req }) => {
      const body = req.body;
      const media: string[] = body.media;
      const post: string = body?.post;
      if (!post && !media) throw new Error('Either media or post is required');
      if (post.trim().length < 1 && media.length < 1)
        throw new Error('Invalid payload');
      if (media && media.length > 1) {
        media.forEach((e) => {
          //!TODO need to validate is e is valid URL for media
        });
      }
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
