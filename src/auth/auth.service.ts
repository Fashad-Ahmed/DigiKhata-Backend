import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './auth.model';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  products: Auth[] = [];
  constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}

  async signin(email, password, FCMtoken) {
    console.log('sign in request started');
    console.log('signin body', email, password, FCMtoken);

    try {
      const userExist = await this.authModel.findOne({ email: email });
      if (!userExist) {
        throw new NotFoundException('User does not exist');
      }

      if (password != userExist.password) {
        console.log('Invalid credentials');
        throw [404];
      }

      const user = {
        userExist,
      };
      return { ...user, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async signup(req) {
    console.log('sign up request started');
    try {
      console.log('entered in try block');
      const uniqueMail = await this.authModel.findOne({
        req: req.email,
      });

      console.log(req.email);
      console.log(req.password);

      console.log('still running sign up');
      const newUser = new this.authModel(req);
      console.log(newUser);

      const user = await this.authModel.create(newUser);
      return { ...user, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
}
