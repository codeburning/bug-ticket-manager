import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastLogin: { type: Date, default: null },
    isEmailVerified: { type: Boolean, default: false },
    mobile: { type: String, default: null },
    profileImage: { type: String, default: null },
    userAvatar: { type: String, default: '#FAFAFA' },
    role: { type: String, default: 'ADMIN', enum: ['ADMIN', 'USER'] },
    accountId: { type: String, required: true },
  },
  { collection: 'user-records', timestamps: true },
);
userSchema.index({ email: 1 });
userSchema.index({ accountId: 1 });
userSchema.index({ accountId: 1, firstName: 1, email: 1 });

export default mongoose.model('user-records', userSchema);
