import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './account.model';
import { Auth } from 'src/auth/auth.model';

@Injectable()
export class AccountService {
  products: Account[] = [];
  constructor(
    @InjectModel('Account') private readonly accountModel: Model<Account>,
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
  ) {}
  // accountName, accountType, accountBalance
  async createAccount(req): Promise<any> {
    console.log('account request started');
    console.log('account -->', req);

    try {
      const newAccount = await new this.accountModel({
        accountName: req.name,
        accountBalance: req.balance,
        userId: req.userId,
      });

      const account = await this.accountModel.create(newAccount);
      return { ...account, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async showAccounts(userId): Promise<any> {
    console.log('account request started');

    // try {
    //   console.log('entered in try block');

    //   const findId = await this.accountModel
    //     .find({
    //       userId: userId,
    //     })
    //     .countDocuments();

    //   if (!findId) {
    //     console.log(`something went wrong`);
    //     throw [404];
    //   }
    // } catch (error) {
    //   console.log(error);
    //   throw [404, error.message];
    // }

    try {
      const getAccounts = await this.accountModel
        .find({ userId: userId })
        .exec();
      if (!getAccounts) {
        console.log(`no account found!`);
      }
      return getAccounts;
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
}
