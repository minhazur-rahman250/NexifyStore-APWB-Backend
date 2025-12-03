import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';
 
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
 
  // POST /categories
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }
 
  // GET /categories  or /categories?search=...
  @Get()
  findAll(@Query('search') search?: string) {
    return this.categoryService.findAll(search);
  }
 
  // GET /categories/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }
 
  // PATCH /categories/:id
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CategoryDto>,
  ) {
    return this.categoryService.update(id, dto);
  }
 
  // DELETE /categories/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}