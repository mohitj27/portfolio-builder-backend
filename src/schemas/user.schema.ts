import * as mongoose from 'mongoose';
const { Schema } = mongoose;
export const UserSchema = new Schema({
  email: { type: String, required: true },
  Otp: Number,
  OtpTime: Number,
});
