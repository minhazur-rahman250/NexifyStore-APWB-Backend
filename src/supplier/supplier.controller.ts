// src/supplier/supplier.controller.ts
import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierDto } from './supplier.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  // 1) POST /supplier
  @Post()
  create(@Body() createSupplierDto: SupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  // 2) GET /supplier
  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  // 3) GET /supplier/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(Number(id));
  }

  // 4) GET /supplier/search/byname?name=abc
  @Get('search/byname')
  findByName(@Query('name') name: string) {
    return this.supplierService.findByName(name);
  }

  // 5) PUT /supplier/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: Partial<SupplierDto>) {
    return this.supplierService.update(Number(id), updateSupplierDto);
  }

  // 6) PATCH /supplier/:id
  @Patch(':id')
  patch(@Param('id') id: string, @Body() partialData: Partial<SupplierDto>) {
    return this.supplierService.patch(Number(id), partialData);
  }

  // 7) DELETE /supplier/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.supplierService.delete(Number(id));
  }

  // 8) GET /supplier/count/all
  @Get('count/all')
  countAll() {
    return this.supplierService.countAll();
  }
}
