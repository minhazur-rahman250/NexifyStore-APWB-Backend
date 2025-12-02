import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerModule } from './buyer/buyer.module';
import { SellerModule } from './seller/seller.module';
import { SupplierModule } from './supplier/supplier.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from './orders/order.module';
import { TransactionModule } from './transactions/transaction.module';
import { CategoryModule } from './products/category.module';
import { ReviewModule } from './products/review.module';
import { CartModule } from './cart/cart.module';
import { NotificationModule } from './notifications/notification.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Ayshu@12', // Change this
      database: 'NexifyStore', // Shared database
      autoLoadEntities: true,
      synchronize: true,
    }),

    NotificationModule,
    CartModule,
    ReviewModule,
    CategoryModule,  
    OrderModule,
    TransactionModule,
    AuthModule,
    BuyerModule,
    SellerModule,
    SupplierModule,
    AdminModule
  ],
})
export class AppModule {}
