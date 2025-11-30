  //buyer.controller.ts
  import { Controller, Get, Post, Put, Patch, Delete, Param, Res, Body, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, BadRequestException, ParseIntPipe, } from '@nestjs/common';
  import { BuyerService } from './buyer.service';
  import { BuyerDto } from './buyer.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { MulterError } from 'multer';
  import express, { query } from 'express';
  import { join } from 'path';

  @Controller('buyer')
  export class BuyerController {
    constructor(private buyerService: BuyerService) {}

    // GET /buyer/ -> all buyers
    @Get()
    findAll() {
      return this.buyerService.findAll();
    }

    // Search routes must come before param routes to avoid ':id' swallowing them
    // GET /buyer/search/by-email?email=...
    @Get('search/by-email')
    searchByEmail(@Query('email') email: string) {
      return this.buyerService.searchByEmail(email);
    }

    // GET /buyer/search/by-name?name=...
    @Get('search/by-name')
    searchByName(@Query('name') name: string) {
      return this.buyerService.searchByName(name);
    }

    // GET /buyer/stats/count
    @Get('stats/count')
    count() {
      return this.buyerService.count();
    }

    // POST /buyer -> create buyer (JSON)
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    createBuyer(@Body() buyer: BuyerDto) {
      return this.buyerService.createBuyer(buyer);
    }

    // Register with NID image (multipart)
    @Post('register-with-nid')
    @UseInterceptors(
      FileInterceptor('nidImage', {
        storage: diskStorage({
          destination: './uploads',
          filename: (_req, file, cb) => {
            const uniqueName = `${Date.now()}${extname(file.originalname)}`;
            cb(null, uniqueName);
          },
        }),
        fileFilter: (_req, file, cb) => {
          // allow jpeg/png/webp
          if (file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
            cb(null, true);
          } else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'nidImage'), false);
          }
        },
        limits: {
          fileSize: 2 * 1024 * 1024, // 2 MB
        },
      }),
    )
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async registerWithNid(@Body() body: BuyerDto, @UploadedFile() file?: Express.Multer.File) {
      if (!file) {
        throw new BadRequestException('NID image is required and must be JPG/PNG/WebP and <= 2MB');
      }

      // attach file info to saved buyer if you have a column for it, else just return
      const created = await this.buyerService.createBuyer({
        ...body,
        // note: BuyerEntity currently only stores name and phone; expand entity to store email/address/nidNumber/fileName
        phone: body.phone,
        name: body.name,
      });

      return {
        message: 'Buyer registered with NID image',
        buyer: created,
        file: { filename: file.filename, size: file.size, path: `./uploads/${file.filename}` },
      };
    }

    // Serve uploaded images
    @Get('getimage/:name')
    getImage(@Param('name') name: string, @Res() res: express.Response) {
      const imagePath = join(process.cwd(), 'uploads', name);
      return res.sendFile(imagePath, (err) => {
        if (err) {
          res.status(404).json({ message: 'Image not found' });
        }
      });
    }

    // GET /buyer/:id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.buyerService.findOne(id);
    }

    // PUT /buyer/:id
    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: BuyerDto) {
      return this.buyerService.updateBuyer(id, dto as any);
    }

    // PATCH /buyer/:id
    @Patch(':id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    patch(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<BuyerDto>) {
      return this.buyerService.updateBuyer(id, dto as any);
    }

    // DELETE /buyer/:id
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.buyerService.remove(id);
    }

    @Delete('phone')
    deleteByPhone(@Query('phone')  phone: string) {
      return this.buyerService.removeByPhone(phone);
    }

    // DELETE /buyer -> clear all
    @Delete()
    clear() {
      return this.buyerService.clear();
    }

     
  }
