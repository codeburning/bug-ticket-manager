import { Response } from 'express';
import { CustomRequest } from '../middleware/authValidator';
import { TeamCreation, TeamCreationBody } from '../types/team';
import { Types } from 'mongoose';
import { createUniqueSetCreation } from '../utils/string-handler';
// import teamSchema from '../models/teamSchema';
import { TeamService } from '../services/teamService';
const teamService = new TeamService();
export class TeamController {
  /**
   *
   * @param req
   * @param res
   */
  async createNewTeam(req: CustomRequest, res: Response) {
    try {
      const body: TeamCreation = req.body;
      const x: TeamCreationBody = {
        ...body,
        manager: new Types.ObjectId(body.manager),
        members: createUniqueSetCreation(body.members, [body.manager]),
        createdBy: new Types.ObjectId(req.sessionTokenPayload?.id),
        meta: { user: { ...req.sessionTokenPayload } },
        accountId: req.sessionTokenPayload?.accountId || '',
      };
      const data = await teamService.newTeam(x);
      return res.json({ data });
    } catch (e: any) {
      return res
        .status(400)
        .json({ error: false, message: e?.['message'] || 'Invalid request' });
    }
  }

  async getTeams(req: CustomRequest, res: Response) {
    const accountId = req.sessionTokenPayload?.accountId || '';
    const teams = await teamService.getTeams({ accountId });
    return res.json({ records: teams });
  }

  async updateTeam(req: CustomRequest, res: Response) {
    // return res.json({ teamId });
    try {
      let body: TeamCreation = req.body;
      const accountId = req.sessionTokenPayload?.accountId || '';
      const teamId: string | undefined = req.params?.['teamId'] || undefined;
      if (!teamId || Types.ObjectId.isValid(teamId) === false)
        throw new Error('Passed team id is not valid');
      //Validate is this team id exist and belongs to this particular account
      const data = await teamService.getTeamById(new Types.ObjectId(teamId));
      if (!data || data.accountId !== accountId)
        return res.status(404).json({ error: true, message: 'Team not found' });
      body = {
        ...body,
        manager: new Types.ObjectId(body.manager),
        members: createUniqueSetCreation(body.members || [], [body.manager]),
      };
      const updated = await teamService.updateTeam(body, data._id);
      return res.json(updated);
    } catch (e: any) {
      return res
        .status(400)
        .json({ error: false, message: e?.['message'] || 'Invalid request' });
    }
  }
}
