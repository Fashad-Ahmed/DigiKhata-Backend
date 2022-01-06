import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const TranSchema = new mongoose.Schema({
  name: { type: String, required: false },
  amount: { type: Number, required: true },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: false,
  },
});

export interface Tran {
  name: string;
  amount: number;
  account: string;
  userId: string;
}
