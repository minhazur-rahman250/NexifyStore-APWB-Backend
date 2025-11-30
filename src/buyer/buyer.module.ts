//buyer.module.ts
import { Module } from '@nestjs/common';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';
import { BuyerEntity } from "./buyer.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [ TypeOrmModule.forFeature([BuyerEntity]),],
  controllers: [BuyerController],
  providers: [BuyerService]
})
export class BuyerModule {}
