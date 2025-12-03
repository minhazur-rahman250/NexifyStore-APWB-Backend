    // src/orders/order.module.ts
    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { OrderEntity } from './order.entity';
    import { OrderItemEntity } from './order-item.entity';
    import { ProductModule } from '../products/product.module';
import { ProductEntity } from 'src/products/product.entity';
import { UserEntity } from 'src/auth/user.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

    @Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity,UserEntity,
    ProductEntity,]),  ProductModule, ],
    controllers: [OrderController],
    providers: [OrderService],
    })
    export class OrderModule {}
