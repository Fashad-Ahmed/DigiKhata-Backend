import { Controller, Post, Body, Req, Get, Param } from '@nestjs/common';
import { TranService } from './tran.service';
import { Request } from 'express';

@Controller('tran')
export class TranController {
  constructor(private readonly tranService: TranService) {}

  @Get('/show')
  async getTransfer(@Param('id') id): Promise<any> {
    try {
      return this.tranService.getTran(id);
    } catch (error) {
      return error;
    }
  }

  @Post('/saveTran')
  async saveTransfer(@Req() request: Request) {
    try {
      const res = await this.tranService.saveTran(request.body);
      return { result: res };
    } catch (error) {
      return error;
    }
  }
}
