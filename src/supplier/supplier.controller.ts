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
  FileTypeValidator
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SupplierService } from './supplier.service';
import { SupplierDto } from './supplier.dto';
import { EmailAiubPipe } from './pipes/email-aiub.pipe';
import { PasswordUppercasePipe } from './pipes/password-uppercase.pipe';
import { GenderValidationPipe } from './pipes/gender.pipe';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  // ==================== ORIGINAL SUPPLIER ENDPOINTS ====================

  // 1) POST /supplier - Original
  @Post()
  create(@Body() createSupplierDto: SupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  // 2) GET /supplier - Get all suppliers
  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  // 3) GET /supplier/:id - Get supplier by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(Number(id));
  }

  // 4) GET /supplier/search/byemail - Search by email
  @Get('search/byemail')
  findByemail(@Query('email') email: string) {
    return this.supplierService.findByEmail(email);
  }

  // 5) PUT /supplier/:id - Full update original supplier
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: Partial<SupplierDto>) {
    return this.supplierService.update(Number(id), updateSupplierDto);
  }

  // 6) PATCH /supplier/:id - Partial update original supplier
  @Patch(':id')
  patch(@Param('id') id: string, @Body() partialData: Partial<SupplierDto>) {
    return this.supplierService.patch(Number(id), partialData);
  }

  // 7) DELETE /supplier/:id - Delete original supplier
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.supplierService.delete(Number(id));
  }

  // 8) GET /supplier/count/all - Count all suppliers
  @Get('count/all')
  countAll() {
    return this.supplierService.countAll();
  }

  // ==================== CATEGORY2 SUPPLIER ENDPOINTS ====================

  // POST /supplier/category2 - Create Category2 supplier with validation & file upload
  @Post('category2')
  @UseInterceptors(FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        callback(null, `supplier-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  createCategory2(
    @Body('name') name: string,
    @Body('email', EmailAiubPipe) email: string,
    @Body('password', PasswordUppercasePipe) password: string,
    @Body('gender', GenderValidationPipe) gender: string,
    @Body('contactNumber', PhoneNumberPipe) contactNumber: string,
    @Body('address') address: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      })
    ) file?: Express.Multer.File,
  ) {
    const supplierData = {
      name,
      email,
      password,
      gender,
      contactNumber,
      address,
      profileImage: file ? file.filename : null
    };
    return this.supplierService.createCategory2(supplierData);
  }

  // GET /supplier/category2/all - Get all Category2 suppliers
  @Get('category2/all')
  findAllCategory2() {
    return this.supplierService.findAllCategory2();
  }

  // GET /supplier/category2/:id - Get Category2 supplier by ID
  @Get('category2/:id')
  findOneCategory2(@Param('id') id: string) {
    return this.supplierService.findOneCategory2(Number(id));
  }

  // PUT /supplier/category2/:id - Full update Category2 supplier with validation
  @Put('category2/:id')
  @UseInterceptors(FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        callback(null, `supplier-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  updateCategory2(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('email', EmailAiubPipe) email: string,
    @Body('password', PasswordUppercasePipe) password: string,
    @Body('gender', GenderValidationPipe) gender: string,
    @Body('contactNumber', PhoneNumberPipe) contactNumber: string,
    @Body('address') address: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      })
    ) file?: Express.Multer.File,
  ) {
    const updateData: any = {
      name,
      email,
      password,
      gender,
      contactNumber,
      address
    };

    // Only add profileImage if file is provided
    if (file) {
      updateData.profileImage = file.filename;
    }

    return this.supplierService.updateCategory2(Number(id), updateData);
  }

  // PATCH /supplier/category2/:id - Partial update Category2 supplier with validation
  @Patch('category2/:id')
  patchCategory2(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('email', EmailAiubPipe) email?: string,
    @Body('password', PasswordUppercasePipe) password?: string,
    @Body('gender', GenderValidationPipe) gender?: string,
    @Body('contactNumber', PhoneNumberPipe) contactNumber?: string,
    @Body('address') address?: string,
  ) {
    const partialData: any = {};
    
    if (name) partialData.name = name;
    if (email) partialData.email = email;
    if (password) partialData.password = password;
    if (gender) partialData.gender = gender;
    if (contactNumber) partialData.contactNumber = contactNumber;
    if (address) partialData.address = address;

    return this.supplierService.patchCategory2(Number(id), partialData);
  }

  // DELETE /supplier/category2/:id - Delete Category2 supplier
  @Delete('category2/:id')
  deleteCategory2(@Param('id') id: string) {
    return this.supplierService.deleteCategory2(Number(id));
  }

  // GET /supplier/category2/count/all - Count all Category2 suppliers
  @Get('category2/count/all')
  countAllCategory2() {
    return this.supplierService.countAllCategory2();
  }

  // ==================== VALIDATION TEST ENDPOINTS ====================

  @Post('validate/email')
  validateEmail(@Body('email', EmailAiubPipe) email: string) {
    return { message: 'Email validation successful', email };
  }

  @Post('validate/password')
  validatePassword(@Body('password', PasswordUppercasePipe) password: string) {
    return { message: 'Password validation successful' };
  }

  @Post('validate/gender')
  validateGender(@Body('gender', GenderValidationPipe) gender: string) {
    return { message: 'Gender validation successful', gender };
  }

  @Post('validate/phone')
  validatePhone(@Body('contactNumber', PhoneNumberPipe) contactNumber: string) {
    return { message: 'Phone number validation successful', contactNumber };
  }

  // ==================== SEARCH ENDPOINTS FOR CATEGORY2 ====================

  @Get('category2/search/byemail')
  findCategory2ByEmail(@Query('email') email: string) {
    return this.supplierService.findCategory2ByEmail(email);
  }

  @Get('category2/search/byname')
  findCategory2ByName(@Query('name') name: string) {
    return this.supplierService.findCategory2ByName(name);
  }
}