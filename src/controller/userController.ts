import { Response } from 'express';
import { CustomRequest } from '../middleware/authValidator';
// import userSchema from '../models/userSchema';
import { UserService } from '../services/userService';
import { RegisterNewUser } from '../types/auth';
import { createBcryptHash } from '../utils/bcrypt';
const userService = new UserService();
export class UserController {
  async handleGetUsers(req: CustomRequest, res: Response) {
    try {
      const accountId = req.sessionTokenPayload?.accountId || '';
      const page: number = req.query.page ? Number(req.query.page) : 1;
      const size: number = req.query.size ? Number(req.query.size) : 10;
      const searchQuery: string | undefined = req.query.search
        ? String(req.query.search)
        : undefined;
      //Will add pagination support
      //Lets add support to query using search query
      const records = await userService.getRecords(
        {
          accountId,
          ...(searchQuery && {
            $or: [
              { firstName: { $regex: searchQuery, $options: 'i' } },
              { email: { $regex: searchQuery, $options: 'i' } },
            ],
          }),
        },
        0,
        0,
      );
      return res.json(records);
    } catch (e: any) {
      return res.status(400).json({ error: true, message: e?.['message'] });
    }
  }
  async handleUserCreation(req: CustomRequest, res: Response) {
    try {
      const body: RegisterNewUser = req.body;
      body.password = createBcryptHash(body.password);
      body.role = 'USER';
      body.accountId = req.sessionTokenPayload?.accountId || '';
      if (!body.accountId) throw new Error('Account id is not found');
      //Step 1  check is email is already used
      let user = await userService.getUserProfileByEmail(body.email);
      if (user)
        return res
          .status(404)
          .json({ error: true, message: 'User email is already used' });
      user = await userService.newUserCreation(body);
      return res.json({ message: `${body.email} is added` });
    } catch (e: any) {
      return res
        .status(400)
        .json({ error: true, message: e?.['message'] || 'Error' });
    }
  }
}
