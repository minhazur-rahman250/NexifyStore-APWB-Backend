// src/supplier/supplier.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SupplierService } from './supplier.service';
import { SupplierDto } from './supplier.dto';
import { AllValidationPipe } from './pipes/all-validation.pipe';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  // ========== ORIGINAL SUPPLIER ENDPOINTS (UserEntity) ==========

  // POST /supplier
  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createSupplierDto: SupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  // GET /supplier
  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  // GET /supplier/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  // GET /supplier/search/byemail
  @Get('search/byemail')
  findByEmail(@Query('email') email: string) {
    return this.supplierService.findByEmail(email);
  }

  // PUT /supplier/:id
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(@Param('id') id: string, @Body() updateSupplierDto: Partial<SupplierDto>) {
    return this.supplierService.update(id, updateSupplierDto);
  }

  // PUT /supplier/:supplierId/products
  @Put(':supplierId/products')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  replaceSupplierProducts(
    @Param('supplierId') supplierId: string,
    @Body() body: { productIds: number[] },
  ) {
    return this.supplierService.replaceSupplierProducts(supplierId, body.productIds);
  }

  // GET /supplier/:supplierId/products
  @Get(':supplierId/products')
  getSupplierProducts(@Param('supplierId') supplierId: string) {
    return this.supplierService.getSupplierProducts(supplierId);
  }

  // PATCH /supplier/:id
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  patch(@Param('id') id: string, @Body() partialData: Partial<SupplierDto>) {
    return this.supplierService.patch(id, partialData);
  }

  // DELETE /supplier/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.supplierService.delete(id);
  }

  // GET /supplier/count/all
  @Get('count/all')
  countAll() {
    return this.supplierService.countAll();
  }

  // ========== CATEGORY 2 & 4 ENDPOINTS (same as your existing, omitted for brevity) ==========
  // Keep your category2 and category4 endpoints as they are, since they already work with SupplierService.
}
