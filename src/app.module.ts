import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import config from './config/keys';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { TransferModule } from './transfer/transfer.module';
import { TranModule } from './transaction/tran.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(config.mongoURI),
    AccountModule,
    TransferModule,
    TranModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
