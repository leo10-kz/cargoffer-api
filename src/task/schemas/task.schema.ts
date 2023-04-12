import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  name: String,
  description: String,
  category: String,
  expirationDate: {
    type: Date,
    default: Date.now,
  },
});
