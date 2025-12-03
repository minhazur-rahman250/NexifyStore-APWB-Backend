import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
 
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
 
  // POST /products  -> create product (sellerId লাগবে)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() dto: ProductDto) {
    return this.productService.create(dto);
  }
 
  // GET /products  -> all products (optional search)
  @Get()
  findAll(@Query('search') search?: string) {
    return this.productService.findAll(search);
  }
 
  // GET /products/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }
 
  // PATCH /products/:id
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<ProductDto>,
  ) {
    return this.productService.update(id, dto);
  }
 
  // DELETE /products/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}