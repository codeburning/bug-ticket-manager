import mongoose, { Schema, Types } from 'mongoose';

const activitySchema = new Schema(
  {
    ticket: { type: Types.ObjectId, required: true, ref: 'tickets' },
    post: { type: String, default: null },
    media: { type: Array<string>, default: [] },
    postedBy: { type: Types.ObjectId, required: true, ref: 'user-records' },
    type: {
      type: String,
      default: 'SYSTEM_GENERATED',
      enum: ['SYSTEM_GENERATED', 'USER_POSTED'],
    },
  },
  { collection: 'activities', timestamps: true },
);
activitySchema.index({ _id: 1, ticket: 1 });
activitySchema.index({ ticket: 1 });

export default mongoose.model('activities', activitySchema);
