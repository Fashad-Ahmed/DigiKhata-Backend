import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Model } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('FCMtoken') FCMtoken: string,
  ) {
    try {
      const res = await this.authService.signin(email, password, FCMtoken);
      console.log(`signed in`);
      return { result: res };
    } catch (error) {
      return error;
    }
  }

  @Post('/signup')
  async signup(@Req() request: Request) {
    try {
      const res = await this.authService.signup(request.body);
      return { result: res };
    } catch (error) {
      return error;
    }
  }
}
