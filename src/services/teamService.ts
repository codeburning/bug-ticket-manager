import { Types } from 'mongoose';
import teamSchema from '../models/teamSchema';
import { TeamCreationBody } from '../types/team';
import userSchema from '../models/userSchema';
// import teams from '../models/teamSchema';

export class TeamService {
  async getTeamById(id: Types.ObjectId) {
    return await teamSchema.findById(id);
  }
  /**
   *
   * @param b
   * @returns
   */
  async newTeam(b: TeamCreationBody) {
    try {
      const x = new teamSchema(b);
      return await x.save();
    } catch (e) {
      throw e;
    }
  }
  async getTeams(filter: { [key: string]: any }) {
    return await teamSchema
      .find(filter, { meta: 0 })
      .sort({ name: 1 })
      .allowDiskUse(true)
      .populate('manager', ['firstName', 'email', 'userAvatar'], userSchema)
      .lean();
  }
  async updateTeam(option: { [key: string]: any }, id: Types.ObjectId) {
    return await teamSchema.findByIdAndUpdate(id, option, { new: true });
  }
}
