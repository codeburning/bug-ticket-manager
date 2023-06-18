import { Response } from 'express';
import { CustomRequest } from '../middleware/authValidator';
import { Activity, ActivityCreation } from '../types/activity';
import { Types } from 'mongoose';
import { TicketService } from '../services/ticketService';
import { ActivityService } from '../services/activityService';
const activity = new ActivityService();
const ticket = new TicketService();
export class ActivityController {
  async postNewActivity(req: CustomRequest, res: Response) {
    try {
      const body: Activity = req.body;
      const ticketId = req.params['ticketId'];
      if (!ticketId || !Types.ObjectId.isValid(ticketId)) {
        throw new Error('Invalid ticket id passed');
      }
      const data = await ticket.getTicketById(new Types.ObjectId(ticketId));
      if (!data || data.accountId !== req.sessionTokenPayload?.accountId) {
        return res
          .status(400)
          .json({ error: true, message: 'Ticket not found' });
      }
      //   return res.json({ data });
      const x: ActivityCreation = {
        ...body,
        postedBy: new Types.ObjectId(req.sessionTokenPayload.id),
        ticket: data._id,
        type: 'USER_POSTED',
      };
      const response = await activity.createNew(x);
      return res.json(response);
    } catch (e: any) {
      return res
        .status(400)
        .json({ error: true, message: e?.['message'] || 'Invalid request' });
    }
  }

  async getActivities(req: CustomRequest, res: Response) {
    try {
      const ticketId = req.params['ticketId'];
      if (!Types.ObjectId.isValid(ticketId)) throw new Error('Invalid request');
      const data = await ticket.getTicketById(new Types.ObjectId(ticketId));
      if (!data || data.accountId !== req.sessionTokenPayload?.accountId) {
        return res
          .status(400)
          .json({ error: true, message: 'Ticket not found' });
      }
      const records = await activity.getActivities({ ticket: data._id });
      return res.json({ records });
    } catch (e: any) {
      return res
        .status(400)
        .json({ error: true, message: e?.['message'] || 'Invalid request' });
    }
  }

  async deleteActivityPost(req: CustomRequest, res: Response) {
    try {
      const ticketId = req.params?.['ticketId'];
      const activityId = req.params?.['activityId'];
      if (
        !Types.ObjectId.isValid(ticketId) ||
        !Types.ObjectId.isValid(activityId)
      )
        throw new Error('Invalid request');

      const data = await ticket.getTicketById(new Types.ObjectId(ticketId));
      if (!data || data.accountId !== req.sessionTokenPayload?.accountId) {
        return res
          .status(400)
          .json({ error: true, message: 'Ticket not found' });
      }
      //   return res.json({ data });
      const response = await activity.deleteActivity({
        ticket: data._id,
        _id: new Types.ObjectId(activityId),
      });
      return res.json(response);
    } catch (e: any) {
      return res
        .status(400)
        .json({ error: true, message: e?.['message'] || 'Invalid request' });
    }
  }
}
