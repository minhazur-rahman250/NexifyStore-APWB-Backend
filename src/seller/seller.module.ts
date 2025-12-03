import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { SellerEntity } from './seller.entity';
import { ProductEntity } from 'src/products/product.entity';
import { UserEntity } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity,ProductEntity, UserEntity])],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [SellerService],
})
export class SellerModule {}
