// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pgsql123',
      database: 'seller',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SellerModule,
  ],
})
export class AppModule {}
