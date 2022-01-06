import { Controller, Post, Body, Req, Get, Param } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { Request } from 'express';
import { Account } from 'src/account/account.model';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get('/:id')
  async getTransfer(@Param('id') id): Promise<any> {
    try {
      return this.transferService.getTransfer(id);
    } catch (error) {
      return error;
    }
  }

  @Post('/saveTransfer')
  async saveTransfer(@Req() request: Request) {
    try {
      const res = await this.transferService.saveTransfer(request.body);
      return { result: res };
    } catch (error) {
      return error;
    }
  }
}
