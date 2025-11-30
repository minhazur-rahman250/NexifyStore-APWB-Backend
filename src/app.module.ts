import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerModule } from './buyer/buyer.module';
//import { SellerModule } from './seller/seller.module';
//import { SupplierModule } from './supplier/supplier.module';
//import { AuthModule } from './auth/auth.module';

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
    
    //AuthModule,
    BuyerModule,
    //SellerModule,
    //SupplierModule,
    //Add AdminModule later
  ],
})
export class AppModule {}
