import { Controller,Get,Post,Put,Patch,Delete,Param,Res,Body,Query,UsePipes,ValidationPipe,UseInterceptors,UploadedFile,BadRequestException,ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterError } from 'multer';
import express from 'express';
import { join } from 'path';
import { BuyerService } from './buyer.service';
import { BuyerDto } from './buyer.dto';

@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  // ========== GET ALL BUYERS ==========
  // GET /buyer
  @Get()
  findAll() {
    return this.buyerService.findAll();
  }

  // ========== SEARCH ROUTES (Must come before :id routes) ==========

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

  // ========== CREATE BUYER (JSON) ==========
  // POST /buyer
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createBuyer(@Body() buyer: BuyerDto) {
    return this.buyerService.createBuyer(buyer);
  }

  // ========== REGISTER WITH NID IMAGE (File Upload) ==========
  // POST /buyer/register-with-nid
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
        // Allow only JPEG, PNG, WebP images
        if (file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
          cb(null, true);
        } else {
          cb(
            new MulterError('LIMIT_UNEXPECTED_FILE', 'nidImage'),
            false,
          );
        }
      },
      limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB maximum
      },
    }),
  )
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async registerWithNid(
    @Body() body: BuyerDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'NID image is required and must be JPG/PNG/WebP and <= 2MB',
      );
    }

    try {
      const created = await this.buyerService.createBuyer({
        ...body,
        phone: body.phone,
        name: body.name,
      });

      return {
        message: 'Buyer registered with NID image successfully',
        buyer: created,
        file: {
          filename: file.filename,
          size: file.size,
          path: `./uploads/${file.filename}`,
          mimetype: file.mimetype,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // ========== SERVE UPLOADED IMAGE ==========
  // GET /buyer/getimage/:name
  @Get('getimage/:name')
  getImage(@Param('name') name: string, @Res() res: express.Response) {
    try {
      const imagePath = join(process.cwd(), 'uploads', name);
      return res.sendFile(imagePath, (err) => {
        if (err) {
          res.status(404).json({ message: 'Image not found' });
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve image' });
    }
  }

  // ========== GET BUYER BY ID ==========
  // GET /buyer/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.buyerService.findOne(id);
  }

  // ========== UPDATE BUYER ==========
  // PUT /buyer/:id
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: BuyerDto) {
    return this.buyerService.updateBuyer(id, dto as any);
  }

  // ========== PATCH BUYER ==========
  // PATCH /buyer/:id
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  patch(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<BuyerDto>) {
    return this.buyerService.updateBuyer(id, dto as any);
  }

  // ========== DELETE BUYER BY ID ==========
  // DELETE /buyer/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.buyerService.remove(id);
  }

  // ========== DELETE BUYER BY PHONE ==========
  // DELETE /buyer/phone?phone=...
  @Delete('phone/:phone')
  deleteByPhone(@Param('phone') phone: string) {
    return this.buyerService.removeByPhone(phone);
  }

  // ========== CLEAR ALL BUYERS ==========
  // DELETE /buyer/all
  @Delete('all/clear')
  clear() {
    return this.buyerService.clear();
  }
}
