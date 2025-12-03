import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminActionLogEntity } from './admin-action-log.entity';
import { UserEntity } from '../auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminActionLogEntity, UserEntity]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  
})
export class AdminModule {}
