import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from 'src/account/account.model';
import { Auth } from 'src/auth/auth.model';
import { DX } from './transfer.model';
import { Model } from 'mongoose';

@Injectable()
export class TransferService {
  constructor(
    @InjectModel('DX') private readonly transferModel: Model<DX>,
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
    @InjectModel('Account') private readonly accountModel: Model<Account>,
  ) {}

  async saveTransfer(req): Promise<any> {
    console.log('transfer request started');
    console.log(`body-->`, req);

    try {
      const newTransfer = await new this.transferModel(req);
      console.log(newTransfer);
      const transfer = await this.transferModel.create(newTransfer);
      console.log(transfer);
      return { ...transfer, statusCode: 200 };
    } catch (error) {
      console.log(`error`);
      throw [404, `error.message`];
    }
  }

  async getTransfer(id: any): Promise<any> {
    console.log('get transfers started');
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
      const getTransfer = await this.transferModel
        .find({ findUserId: id })
        .populate('from')
        .populate('to');
      if (!getTransfer) {
        console.log('transfer transaction not found!');
      }
      return getTransfer;
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
}
