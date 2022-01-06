import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const TransferSchema = new mongoose.Schema({
  amount: { type: Number, required: true, unique: true },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
  },
});

export interface DX {
  amount: number;
  from: string;
  to: string;
}
