import { Types } from 'mongoose';
import activitySchema from '../models/activitySchema';
import { ActivityCreation } from '../types/activity';
import userSchema from '../models/userSchema';

export class ActivityService {
  async getActivityById(id: Types.ObjectId) {
    return activitySchema.findById(id).lean();
  }
  async createNew(b: ActivityCreation) {
    try {
      const x = new activitySchema(b);
      return await x.save();
    } catch (e) {
      throw e;
    }
  }
  async getActivities(filter: { [key: string]: any }) {
    return await activitySchema
      .find({ ...filter })
      .sort({ createdAt: -1 })
      .populate('postedBy', ['firstName', 'email', 'userAvatar'], userSchema)
      .allowDiskUse(true)
      .lean();
  }
  async deleteActivity(filter: { [key: string]: any }) {
    return await activitySchema.deleteOne(filter);
  }
}
