import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { ProductEntity } from '../products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, ProductEntity]),
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class CategoryModule {}
