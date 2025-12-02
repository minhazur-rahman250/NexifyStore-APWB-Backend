import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  exports: [TypeOrmModule],
})
export class ReviewModule {}
