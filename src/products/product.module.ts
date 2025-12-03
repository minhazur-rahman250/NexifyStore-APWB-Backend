  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { ProductEntity } from './product.entity';
import { UserEntity } from 'src/auth/user.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

  @Module({
    imports: [TypeOrmModule.forFeature([ProductEntity,UserEntity])],
    controllers: [ProductController],  
    providers: [ProductService],
    exports: [TypeOrmModule]
  })
  export class ProductModule {}
