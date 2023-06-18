import mongoose, { Schema, Types } from 'mongoose';

const ticketSchema = new Schema(
  {
    //This will get auto generated and should be unique
    ticketId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: null },
    notes: { type: String, default: null },
    assignedTeam: { type: Array<Types.ObjectId>, ref: 'teams', default: [] },
    createdBy: { type: Types.ObjectId, required: true, ref: 'user-records' },
    status: { type: String, default: 'OPEN' },
    closedAt: { type: Number, default: 0 },
    closedBy: {
      type: Types.ObjectId,
      required: false,
      default: null,
      ref: 'user-records',
    },
    media: { type: Array<string>, default: [] }, //supported Media
    clientName: { type: String, default: null },
    clientEmail: { type: String, default: null },
    userName: { type: String, default: null },
    userMobile: { type: String, default: null },
    accountId: { type: String, required: true },
  },
  { collection: 'tickets', timestamps: true },
);

ticketSchema.index({ accountId: 1 });
ticketSchema.index({ accountId: 1, assignedTeam: 1 });
ticketSchema.index({ accountId: 1, assignedTeam: 1, status: 1 });
ticketSchema.index({ accountId: 1, status: 1 });
ticketSchema.index({ accountId: 1, title: 1, clientName: 1 });
export default mongoose.model('tickets', ticketSchema);
