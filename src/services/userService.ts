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
}
