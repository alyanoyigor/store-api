import { Schema, model } from 'mongoose';
import { TUser } from '../types';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default model('User', userSchema);
