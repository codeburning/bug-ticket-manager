import { Types } from 'mongoose';

export interface TeamCreation {
  name: string;
  manager: Types.ObjectId;
  members: Array<Types.ObjectId>;
}

export interface TeamCreationBody extends TeamCreation {
  createdBy: Types.ObjectId;
  accountId: string;
  meta?: { [key: string]: any };
}
