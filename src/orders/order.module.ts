    // src/orders/order.module.ts
    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { OrderEntity } from './order.entity';
    import { OrderItemEntity } from './order-item.entity';
    import { ProductModule } from '../products/product.module';

    @Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),  ProductModule, ],
    
    })
    export class OrderModule {}
