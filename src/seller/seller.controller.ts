// src/seller/seller.controller.ts
import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { SellerService } from './seller.service';
import { ProductDto } from './seller.dto';
import { SellerCategory4Dto } from './dtos/seller-category4.dto';
import { DateValidationPipe } from './pipes/date-validation.pipe';
import { UrlValidationPipe } from './pipes/url-validation.pipe';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  // existing product endpoints (same as before)
  @Post()
  create(@Body() createProductDto: ProductDto) {
    return this.sellerService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.sellerService.findAll();
  }

    @Get('users')
getSellerUsers() {
  return this.sellerService.getSellerUsers();
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(id);
  }

  @Get('search/byname')
  findByName(@Query('name') name: string) {
    return this.sellerService.findByName(name);
  }

  @Get('search/bycategory')
  findByCategory(@Query('category') category: string) {
    return this.sellerService.findByCategory(category);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    return this.sellerService.update(id, updateProductDto);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() partialData: Partial<ProductDto>) {
    return this.sellerService.patch(id, partialData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.sellerService.delete(id);
  }

  @Get('count/all')
  countAll() {
    return this.sellerService.countAll();
  }




  // ---------------------
  // NEW: User Category 4 endpoint for Seller
  // POST /seller/category4
  @Post('category4')
  @HttpCode(HttpStatus.CREATED)
  createSellerCategory4(
    @Body() body: SellerCategory4Dto,
    @Body('dateOfBirth', new DateValidationPipe()) validatedDate: string,
    @Body('socialLink', new UrlValidationPipe()) validatedUrl: string,
  ) {
    // body already validated by DTO (class-validator) for name & password presence & pattern
    // the two pipes above validate date and URL specifically
    // call service to create
    return this.sellerService.createCategory4({ ...body, dateOfBirth: validatedDate, socialLink: validatedUrl });
  }
}
