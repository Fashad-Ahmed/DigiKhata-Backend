import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
