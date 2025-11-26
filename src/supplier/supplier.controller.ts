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
  UsePipes
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SupplierService } from './supplier.service';
import { SupplierDto } from './supplier.dto';
import { AllValidationPipe } from './pipes/all-validation.pipe';

@Controller('supplier')
export class SupplierController {
  constructor(
    private readonly supplierService: SupplierService
  ) {}

  // ORIGINAL SUPPLIER ENDPOINTS 

  @Post()
  create(@Body() createSupplierDto: SupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(Number(id));
  }

  @Get('search/byemail')
  findByEmail(@Query('email') email: string) {
    return this.supplierService.findByEmail(email);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: Partial<SupplierDto>) {
    return this.supplierService.update(Number(id), updateSupplierDto);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() partialData: Partial<SupplierDto>) {
    return this.supplierService.patch(Number(id), partialData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.supplierService.delete(Number(id));
  }

  @Get('count/all')
  countAll() {
    return this.supplierService.countAll();
  }

  // CATEGORY2 SUPPLIER ENDPOINTS 

  @Post('category2')
  @UseInterceptors(FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `supplier-${uniqueSuffix}${ext}`);
      }
    })
  }))
  @UsePipes(AllValidationPipe)
  createCategory2(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' })
        ],
        fileIsRequired: false
      })
    ) file?: Express.Multer.File
  ) {
    const supplierData = { 
      ...body, 
      profileImage: file ? file.filename : null 
    };
    
    return this.supplierService.createCategory2(supplierData);
  }

  @Get('category2/all')
  findAllCategory2() {
    return this.supplierService.findAllCategory2();
  }

  @Get('category2/:id')
  findOneCategory2(@Param('id') id: string) {
    return this.supplierService.findOneCategory2(Number(id));
  }

  @Put('category2/:id')
  @UseInterceptors(FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `supplier-${uniqueSuffix}${ext}`);
      }
    })
  }))
  @UsePipes(AllValidationPipe)
  updateCategory2(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' })
        ],
        fileIsRequired: false
      })
    ) file?: Express.Multer.File
  ) {
    if (file) body.profileImage = file.filename;
    return this.supplierService.updateCategory2(Number(id), body);
  }

  @Patch('category2/:id')
  @UsePipes(AllValidationPipe)
  patchCategory2(@Param('id') id: string, @Body() body: any) {
    return this.supplierService.patchCategory2(Number(id), body);
  }

  @Delete('category2/:id')
  deleteCategory2(@Param('id') id: string) {
    return this.supplierService.deleteCategory2(Number(id));
  }

  @Get('category2/count/all')
  countAllCategory2() {
    return this.supplierService.countAllCategory2();
  }

  // SEARCH CATEGORY2

  @Get('category2/search/byemail')
  findCategory2ByEmail(@Query('email') email: string) {
    return this.supplierService.findCategory2ByEmail(email);
  }

  @Get('category2/search/byname')
  findCategory2ByName(@Query('name') name: string) {
    return this.supplierService.findCategory2ByName(name);
  }

  

  @Post('validate')
  @UsePipes(AllValidationPipe)
  validateAll(@Body() body: any) {
    return { message: 'Validation successful', data: body };
  }

  //CATEGORY 4 SUPPLIER ENDPOINTS (TypeORM)

@Post('category4')
createCategory4(@Body() body: any) {
  return this.supplierService.createCategory4(body);
}

@Get('category4/all')
getAllCategory4() {
  return this.supplierService.getAllCategory4();
}



@Get('category4/bydate')
getByJoiningDate(@Query('date') date: string) {
  return this.supplierService.getUsersByJoiningDate(date);
}

@Get('category4/default-country')
getByDefaultCountry() {
  return this.supplierService.getUsersWithDefaultCountry();
}


@Get('category4/:id')
getCategory4ById(@Param('id') id: string) {
  return this.supplierService.getCategory4ById(Number(id));
}

@Patch('category4/:id/country')
updateCountry(
  @Param('id') id: string,
  @Body('country') country: string
) {
  return this.supplierService.updateCountry(Number(id), country);
}

@Delete('category4/:id')
deleteCategory4(@Param('id') id: string) {
  return this.supplierService.deleteCategory4(Number(id));
}

}