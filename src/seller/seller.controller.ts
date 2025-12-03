import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { ProductDto, CreateUserDto, UpdateStatusDto } from './seller.dto';
import { UserValidationPipe } from './pipes/validation.pipe';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  // ========== PRODUCT ROUTES (7+ CRUD Operations) ==========

  // POST /seller - Create Product
  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() dto: ProductDto) {
    return this.sellerService.create(dto);
  }

  // GET /seller - Get All Products
  @Get()
  findAll() {
    return this.sellerService.findAll();
  }

  // GET /seller/:id - Get Product by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(id);
  }

  // PATCH /seller/:id - Patch Product
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  patch(@Param('id') id: string, @Body() partialData: Partial<ProductDto>) {
    return this.sellerService.patch(id, partialData);
  }

  // PUT /seller/:id - Update Product
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(@Param('id') id: string, @Body() updateDto: ProductDto) {
    return this.sellerService.update(id, updateDto);
  }

  // DELETE /seller/:id - Delete Product
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.sellerService.delete(id);
  }

  // GET /seller/search/byname - Search Products by Name
  @Get('search/byname')
  findByName(@Body('name') name: string) {
    return this.sellerService.findByName(name);
  }

  // GET /seller/search/bycategory - Search Products by Category
  @Get('search/bycategory')
  findByCategory(@Body('category') category: string) {
    return this.sellerService.findByCategory(category);
  }

  // GET /seller/stats/count - Get Product Count
  @Get('stats/count')
  countAll() {
    return this.sellerService.countAll();
  }

  // ========== USER ROUTES (TypeORM + Pipes) ==========

  // POST /seller/user - Create User
  @Post('user')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  createUser(@Body(new UserValidationPipe()) dto: CreateUserDto) {
    return this.sellerService.createUser(null, dto);
  }

  // PATCH /seller/user/:id/status - Update User Status
  @Patch('user/:id/status')
  updateUserStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStatusDto,
  ) {
    return this.sellerService.updateUserStatus(id, body.status);
  }

  // GET /seller/user/inactive - Get Inactive Users
  @Get('user/inactive')
  getInactiveUsers() {
    return this.sellerService.getInactiveUsers();
  }

  // GET /seller/user/older - Get Users Older Than 40
  @Get('user/older')
  getUsersOlderThan40() {
    return this.sellerService.getUsersOlderThan40();
  }
}
