import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { AllValidationPipe } from './pipes/all-validation.pipe';
//import { Category4Supplier } from './supplier.entity';
import { SupplierStockEntity } from './supplier-stock.entity';
import { Category4Supplier } from './category4-supplier.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ SupplierStockEntity, Category4Supplier])],
  controllers: [SupplierController],
  providers: [SupplierService, AllValidationPipe],
  exports: [SupplierService],
})
export class SupplierModule {}
