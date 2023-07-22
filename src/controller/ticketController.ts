import { Response } from 'express';
import {
  Ticket,
  TicketCreation,
  TicketQuery,
  TicketUpdate,
} from '../types/ticket';
import { Types, isValidObjectId } from 'mongoose';
import { CustomRequest } from '../middleware/authValidator';
import { TicketService } from '../services/ticketService';
import {
  createUniqueSetCreation,
  generateTicketId,
} from '../utils/string-handler';
const ticket = new TicketService();
export class TickerController {
  async createNewTicket(req: CustomRequest, res: Response) {
    try {
      const body: Ticket = req.body;
      //
      const x: TicketCreation = {
        ...body,
        createdBy: new Types.ObjectId(req.sessionTokenPayload?.id),
        status: 'OPEN',
        accountId: req.sessionTokenPayload?.accountId || '',
        ticketId: generateTicketId().toString(),
        assignedTeam: createUniqueSetCreation(body.assignedTeam, []),
      };
      const data = await ticket.newTicket(x);
      return res.json({ data });
    } catch (e) {
      return res.status(400).json({ error: true });
    }
  }
  async getTickets(req: CustomRequest, res: Response) {
    const query: TicketQuery = req.query;
    const accountId = req.sessionTokenPayload?.accountId || '';
    const records = await ticket.getTickets({
      accountId,
      status: { $ne: 'TRASHED' },
      ...(query.team && {
        assignedTeam: { $in: [new Types.ObjectId(query.team)] },
      }),
      ...(query.status && { status: query.status.toUpperCase() }),
    });
    return res.json({ records });
  }
  async handleMoveToTrash(req: CustomRequest, res: Response) {
    try {
      const accountId = req.sessionTokenPayload?.accountId || '';
      const ticketId: string | undefined = req.params?.['ticketId'];
      if (!Types.ObjectId.isValid(ticketId))
        throw new Error('Invalid ticket id passed');
      const details = await ticket.getTicketById(new Types.ObjectId(ticketId));
      if (!details || details.accountId !== accountId) {
        return res.status(404).json({ error: true, message: 'Not found' });
      }
      const update = await ticket.updateTicket(
        { status: 'TRASHED' },
        details._id,
      );
      return res.jsonp({ id: update?._id });
    } catch (e) {
      return res.status(400).json({ error: true });
    }
  }

  /**
   * Update a single Ticket
   */

  async handleTicketUpdate(req: CustomRequest, res: Response) {
    try {
      const ticketId: string | undefined = req.params?.['ticketId'];
      if (!ticketId || !Types.ObjectId.isValid(ticketId))
        throw new Error('Ticket id is not valid');
      const data = await ticket.getTicketById(new Types.ObjectId(ticketId));
      if (!data || data.accountId !== req.sessionTokenPayload?.accountId)
        return res.status(404).json({ error: true, message: 'Not found' });
      const body: TicketUpdate = req.body;
      // return res.json({ body })
      const updated = body
        ? await ticket.updateTicket({ ...body }, data._id)
        : data;
      return res.json({ data: updated });
    } catch (e) {
      return res.status(400).json({ error: true });
    }
  }

  /**
   * Get ticket details for  a single Ticket
   */

  async getTicketDetails(req: CustomRequest, res: Response) {
    try {
      const accountId = req.sessionTokenPayload?.accountId || '';
      if (!accountId) throw new Error('Invalid Request');
      const ticketId = req.params?.['ticketId'] || '';
      if (isValidObjectId(ticketId) === false)
        throw new Error('Invalid Ticket Id passed');

      const ticketData = await ticket.getTicketById(
        new Types.ObjectId(ticketId),
      );

      if (!ticketData || ticketData.accountId !== accountId)
        return res.status(404).json({ message: 'Not found' });
      return res.json(ticketData);
    } catch (e: any) {
      return res
        .status(400)
        .jsonp({ error: true, message: e?.['message'] || 'Error' });
    }
  }
}
