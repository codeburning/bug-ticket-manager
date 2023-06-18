import mongoose, { Schema, Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    manager: { type: Types.ObjectId, ref: 'user-records', required: true },
    members: {
      type: Array<Types.ObjectId>,
      default: [],
      required: true,
      ref: 'user-records',
    },
    createdBy: { type: Types.ObjectId, ref: 'user-records' },
    meta: { type: Object, default: null },
    accountId: { type: String, required: true },
},
  { collection: 'teams', timestamps: true },
);

teamSchema.index({ accountId: 1 });
export default mongoose.model('teams', teamSchema);
