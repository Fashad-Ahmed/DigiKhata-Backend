import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './auth.model';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  products: Auth[] = [];
  constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}

  //   async signin(email, password, FCMtoken) {

  //   }

  async signup(req) {
    console.log('sign up request started');
    try {
      console.log('entered in try block');
      const uniqueMail = await this.authModel.findOne({
        req: req.email,
      });

      console.log(req.email);
      console.log(req.password);
      if (!uniqueMail) {
        console.log('still running sign up');

        // req.password = bcrypt.hash(req.password, 8);
        // // console.log('req--->', req);
        // // delete req.passw;
        // console.log('req2--->', req);

        // const salt = await bcrypt.genSalt(10);
        // req.password = await bcrypt.hash(req.password, salt);

        const newUser = new this.authModel(req);
        console.log(newUser);

        const user = await this.authModel.create(newUser);
        return { ...user, statusCode: 200 };
      } else {
        return 'User Already Exist';
      }
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
}
