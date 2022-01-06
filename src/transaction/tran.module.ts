import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TranSchema } from './tran.model';
import { TranService } from './tran.service';
import { TranController } from './tran.controller';
import { AuthSchema } from 'src/auth/auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Tran', schema: TranSchema },
      { name: 'Auth', schema: 'AuthSchema' },
    ]),
  ],
  controllers: [TranController],
  providers: [TranService],
})
export class TranModule {}
