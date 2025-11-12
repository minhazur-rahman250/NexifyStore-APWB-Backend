// src/seller/seller.controller.ts
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
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  BadRequestException,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { ProductDto } from './seller.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ValidateDatePipe } from '../pipes/validation.pipes';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  // 1) POST /seller
  // Use ValidationPipe (transform:true -> convert number strings to numbers)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  // If you want to accept an image as form-data (key: 'image'), uncomment the interceptor block below
  // @UseInterceptors(FileInterceptor('image', {
  //   storage: diskStorage({
  //     destination: './uploads',
  //     filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname),
  //   }),
  //   fileFilter: (req, file, cb) => {
  //     if (!file.mimetype.match(/^image\/(jpg|jpeg|png|webp)$/)) {
  //       return cb(new BadRequestException('Only image files are allowed'), false);
  //     }
  //     cb(null, true);
  //   },
  //   limits: { fileSize: 2000000 }, // 2MB
  // }))
  create(@Body() createProductDto: ProductDto /*, @UploadedFile() file: Express.Multer.File */) {
    // If you use image, attach file info to dto or handle separately
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
  @UseInterceptors(AnyFilesInterceptor())
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(
    @Param('id') id: string,
    @Body('addedDate', new ValidateDatePipe()) addedDate: Date, // example of using custom pipe for a date field
    @Body() updateProductDto: ProductDto,
  ) {
    // if you used addedDate separately, convert or set into updateProductDto
    if (addedDate) {
      (updateProductDto as any).addedDate = addedDate.toISOString();
    }
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
