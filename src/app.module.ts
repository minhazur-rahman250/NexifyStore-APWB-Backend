import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { SellerModule } from './Seller/seller.module';
import { UsersModule } from './users/users.module'; 
import { BuyerModule } from './buyer/buyer.module'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 

@Module(
    { imports: [ UsersModule, BuyerModule, TypeOrmModule.forRoot( 
        { type: 'postgres', 
          host: 'localhost', 
          port: 5432, 
          username: 'postgres', 
          password: 'Admin', 
          database: 'buyerDB', //Change to your database name 
          autoLoadEntities: true, 
          synchronize: true, 
    } ), 
    ], 
    controllers: [AppController], 
    providers: [AppService], 
}) export class AppModule {}