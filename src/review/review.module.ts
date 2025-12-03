import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './review.entity';
import { UserEntity } from 'src/auth/user.entity';
import { ProductEntity } from 'src/products/product.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, UserEntity, ProductEntity])],
  controllers: [ReviewController], // ✅ must include your controller
  providers: [ReviewService],
})
export class ReviewModule {}
