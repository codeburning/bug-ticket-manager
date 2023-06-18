import { Types } from 'mongoose';

export interface Ticket {
  title: string;
  description: string;
  notes?: string;
  assignedTeam: Array<Types.ObjectId>;
  media: Array<string>;
  clientName: string;
  clientEmail: string;
  userName: string;
  userMobile: string;
}
export interface TicketUpdate extends Ticket {
  status: string;
}

export interface TicketCreation extends Ticket {
  createdBy: Types.ObjectId;
  status: string;
  accountId: string;
  ticketId: string;
}

export interface TicketQuery {
  team?: Types.ObjectId;
  status?: string;
  // page?: number;
  // size?: number;
}
