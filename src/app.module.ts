import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellerController } from './seller/seller.controller';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [SellerModule],
  controllers: [AppController, SellerController],
  providers: [AppService],
})
export class AppModule {}
