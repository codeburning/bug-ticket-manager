import userSchema from '../models/userSchema';
import { RegisterNewUser } from '../types/auth';

export class UserService {
  async newUserCreation(body: RegisterNewUser) {
    try {
      const x = new userSchema(body);
      return await x.save();
    } catch (e) {
      throw e;
    }
  }
  async getUserProfileByEmail(email: string) {
    return await userSchema.findOne({ email }).lean();
  }

  async getRecords(f: { [key: string]: any }, limit: number, skip: number) {
    return await userSchema
      .find(f)
      .limit(limit)
      .skip(skip)
      .lean()
      .sort({ firstName: 1 })
      .allowDiskUse(true);
  }
}
