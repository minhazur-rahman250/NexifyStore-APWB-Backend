import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { SellerModule } from './Seller/seller.module';
import { UsersModule } from './users/users.module';
import { BuyerModule } from './buyer/buyer.module';

@Module({
  imports: [ UsersModule, BuyerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
