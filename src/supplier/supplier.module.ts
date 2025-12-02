import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { AllValidationPipe } from './pipes/all-validation.pipe';
import { Category4Supplier } from './supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category4Supplier])],
  controllers: [SupplierController],
  providers: [SupplierService, AllValidationPipe],
  exports: [SupplierService],
})
export class SupplierModule {}
