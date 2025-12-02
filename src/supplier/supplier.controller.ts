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
  ParseIntPipe,
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

  // ========== ORIGINAL SUPPLIER ENDPOINTS (In-Memory) ==========

  // POST /supplier - Create Original Supplier
  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createSupplierDto: SupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  // GET /supplier - Get All Original Suppliers
  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  // GET /supplier/:id - Get Original Supplier by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.findOne(id);
  }

  // GET /supplier/search/byemail - Search by Email
  @Get('search/byemail')
  findByEmail(@Query('email') email: string) {
    return this.supplierService.findByEmail(email);
  }

  // PUT /supplier/:id - Update Original Supplier
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSupplierDto: Partial<SupplierDto>) {
    return this.supplierService.update(id, updateSupplierDto);
  }

  // PATCH /supplier/:id - Patch Original Supplier
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  patch(@Param('id', ParseIntPipe) id: number, @Body() partialData: Partial<SupplierDto>) {
    return this.supplierService.patch(id, partialData);
  }

  // DELETE /supplier/:id - Delete Original Supplier
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.delete(id);
  }

  // GET /supplier/count/all - Count All Suppliers
  @Get('count/all')
  countAll() {
    return this.supplierService.countAll();
  }

  // ========== CATEGORY 2 SUPPLIER ENDPOINTS (File Upload) ==========

  // POST /supplier/category2 - Create Category2 with File Upload
  @Post('category2')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `supplier-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @UsePipes(AllValidationPipe, new ValidationPipe({ transform: true, whitelist: true }))
  createCategory2(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    const supplierData = {
      ...body,
      profileImage: file ? file.filename : null,
    };
    return this.supplierService.createCategory2(supplierData);
  }

  // GET /supplier/category2/all - Get All Category2 Suppliers
  @Get('category2/all')
  findAllCategory2() {
    return this.supplierService.findAllCategory2();
  }

  // GET /supplier/category2/:id - Get Category2 by ID
  @Get('category2/:id')
  findOneCategory2(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.findOneCategory2(id);
  }

  // PUT /supplier/category2/:id - Update Category2 with File Upload
  @Put('category2/:id')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `supplier-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @UsePipes(AllValidationPipe, new ValidationPipe({ transform: true, whitelist: true }))
  updateCategory2(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    if (file) body.profileImage = file.filename;
    return this.supplierService.updateCategory2(id, body);
  }

  // PATCH /supplier/category2/:id - Patch Category2
  @Patch('category2/:id')
  @UsePipes(AllValidationPipe, new ValidationPipe({ transform: true, whitelist: true }))
  patchCategory2(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.supplierService.patchCategory2(id, body);
  }

  // DELETE /supplier/category2/:id - Delete Category2
  @Delete('category2/:id')
  deleteCategory2(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.deleteCategory2(id);
  }

  // GET /supplier/category2/count/all - Count Category2
  @Get('category2/count/all')
  countAllCategory2() {
    return this.supplierService.countAllCategory2();
  }

  // GET /supplier/category2/search/byemail - Search Category2 by Email
  @Get('category2/search/byemail')
  findCategory2ByEmail(@Query('email') email: string) {
    return this.supplierService.findCategory2ByEmail(email);
  }

  // GET /supplier/category2/search/byname - Search Category2 by Name
  @Get('category2/search/byname')
  findCategory2ByName(@Query('name') name: string) {
    return this.supplierService.findCategory2ByName(name);
  }

  // POST /supplier/validate - Validate Data
  @Post('validate')
  @UsePipes(AllValidationPipe)
  validateAll(@Body() body: any) {
    return { message: 'Validation successful', data: body };
  }

  // ========== CATEGORY 4 SUPPLIER ENDPOINTS (TypeORM Database) ==========

  // POST /supplier/category4 - Create Category4
  @Post('category4')
  createCategory4(@Body() body: any) {
    return this.supplierService.createCategory4(body);
  }

  // GET /supplier/category4/all - Get All Category4
  @Get('category4/all')
  getAllCategory4() {
    return this.supplierService.getAllCategory4();
  }

  // GET /supplier/category4/bydate - Get by Joining Date
  @Get('category4/bydate')
  getByJoiningDate(@Query('date') date: string) {
    return this.supplierService.getUsersByJoiningDate(date);
  }

  // GET /supplier/category4/default-country - Get by Default Country
  @Get('category4/default-country')
  getByDefaultCountry() {
    return this.supplierService.getUsersWithDefaultCountry();
  }

  // GET /supplier/category4/:id - Get Category4 by ID
  @Get('category4/:id')
  getCategory4ById(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.getCategory4ById(id);
  }

  // PATCH /supplier/category4/:id/country - Update Country
  @Patch('category4/:id/country')
  updateCountry(@Param('id', ParseIntPipe) id: number, @Body('country') country: string) {
    return this.supplierService.updateCountry(id, country);
  }

  // DELETE /supplier/category4/:id - Delete Category4
  @Delete('category4/:id')
  deleteCategory4(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.deleteCategory4(id);
  }
}
