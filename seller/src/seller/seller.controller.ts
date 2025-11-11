// src/seller/seller.controller.ts
import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { SellerService } from './seller.service';
import { ProductDto } from './seller.dto';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  // 1) POST /seller
  @Post()
  create(@Body() createProductDto: ProductDto) {
    return this.sellerService.create(createProductDto);
  }

  // 2) GET /seller
  @Get()
  findAll() {
    return this.sellerService.findAll();
  }

  // 3) GET /seller/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(id);
  }

  // 4) GET /seller/search/byname?name=abc
  @Get('search/byname')
  findByName(@Query('name') name: string) {
    return this.sellerService.findByName(name);
  }

  // 5) GET /seller/search/bycategory?category=electronics
  @Get('search/bycategory')
  findByCategory(@Query('category') category: string) {
    return this.sellerService.findByCategory(category);
  }

  // 6) PUT /seller/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    return this.sellerService.update(id, updateProductDto);
  }

  // 7) PATCH /seller/:id
  @Patch(':id')
  patch(@Param('id') id: string, @Body() partialData: Partial<ProductDto>) {
    return this.sellerService.patch(id, partialData);
  }

  // 8) DELETE /seller/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.sellerService.delete(id);
  }

  // 9) GET /seller/count/all
  @Get('count/all')
  countAll() {
    return this.sellerService.countAll();
  }
}
