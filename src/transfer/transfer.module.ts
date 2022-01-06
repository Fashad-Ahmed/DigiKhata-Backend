import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransferSchema } from './transfer.model';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { AccountSchema } from 'src/account/account.model';
import { AuthSchema } from 'src/auth/auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DX', schema: TransferSchema },
      { name: 'Account', schema: AccountSchema },
      { name: 'Auth', schema: AuthSchema },
    ]),
  ],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
