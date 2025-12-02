// src/notifications/notification.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]), // Register entity
  ],
   
  exports: [TypeOrmModule], // Export so other modules can use NotificationEntity
})
export class NotificationModule {}
