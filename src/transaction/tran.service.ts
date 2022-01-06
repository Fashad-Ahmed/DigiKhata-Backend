import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tran } from './tran.model';
import { Account } from 'src/account/account.model';
import { Auth } from 'src/auth/auth.model';
import { Model } from 'mongoose';

export class TranService {
  products: Tran[] = [];
  constructor(
    @InjectModel('Tran') private readonly tranModel: Model<Tran>,
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
  ) {}

  async saveTran(req): Promise<any> {
    console.log('transaction request started');
    console.log(`body-->`, req);

    try {
      const newTran = await new this.tranModel(req);
      console.log(newTran);
      const transfer = await this.tranModel.create(newTran);
      console.log(transfer);
      return { ...transfer, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async getTran(id: any): Promise<any> {
    console.log('get transactions started');
    console.log('id-->', id);

    try {
      const findUserId = await this.authModel
        .find({
          _id: id,
        })
        .countDocuments();

      if (!findUserId) {
        console.log('error');
        throw [401, 'Invalid access key'];
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid access key',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const getTransfer = await this.tranModel
        .find({ findUserId: id })
        .populate('account');

      if (!getTransfer) {
        console.log('transactions not found!');
      }
      return getTransfer;
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
}
