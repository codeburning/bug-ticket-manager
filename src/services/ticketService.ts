import { Types } from 'mongoose';
import teamSchema from '../models/teamSchema';
import ticketSchema from '../models/ticketSchema';
import userSchema from '../models/userSchema';
import { TicketCreation } from '../types/ticket';

export class TicketService {
  async newTicket(b: TicketCreation) {
    try {
      const x = new ticketSchema(b);
      return await x.save();
    } catch (e) {
      throw e;
    }
  }
  async getTickets(filter: { [key: string]: any }) {
    return await ticketSchema
      .find(filter)
      .sort({ createdAt: -1 })
      .populate('createdBy', ['firstName', 'email', 'userAvatar'], userSchema)
      .populate('assignedTeam', ['name'], teamSchema)
      .allowDiskUse(true)
      .lean();
  }
  async getTicketById(id: Types.ObjectId) {
    return await ticketSchema
      .findById(id)
      .populate('createdBy', ['firstName', 'email', 'userAvatar'], userSchema)
      .populate('assignedTeam', ['name'], teamSchema)
      .lean();
  }
  async updateTicket(option: { [key: string]: any }, id: Types.ObjectId) {
    return await ticketSchema.findByIdAndUpdate(id, option, { new: true });
  }
}
