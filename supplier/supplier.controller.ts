import { Controller, Get } from '@nestjs/common';
import { SupplierService } from './supplier.service';

@Controller()
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  getHello(): string {
    return this.supplierService.getHello();
  }
}
 

