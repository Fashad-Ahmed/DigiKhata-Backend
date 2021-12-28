import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  FCMtoken: String,
});

export interface Auth {
  email: string;
  password: string;
  FCMtoken: string;
}
