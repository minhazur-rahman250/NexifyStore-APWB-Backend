import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Ayshu@12', 
      database: 'supplier',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SupplierModule,
  ],
})
export class AppModule {}
