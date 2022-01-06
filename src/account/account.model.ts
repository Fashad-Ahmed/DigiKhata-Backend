import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const AccountSchema = new mongoose.Schema({
  accountName: { type: String, required: true, unique: false },
  accountBalance: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: false,
  },
});

export interface Account {
  accountName: string;
  accountBalance: string;
  accountType: string;
  userId: string;
}
