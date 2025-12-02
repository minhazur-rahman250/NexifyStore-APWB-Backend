import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerModule } from './buyer/buyer.module';
import { SellerModule } from './seller/seller.module';
import { SupplierModule } from './supplier/supplier.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from './orders/order.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Admin', // Change this
      database: 'NexifyStore', // Shared database
      autoLoadEntities: true,
      synchronize: true,
    }),
    OrderModule,
    AuthModule,
    BuyerModule,
    SellerModule,
    SupplierModule,
    AdminModule
  ],
})
export class AppModule {}
