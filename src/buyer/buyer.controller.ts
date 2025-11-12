import { Controller, Get, Post, Put, Patch, Delete, Param, Res, Body, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, BadRequestException,
  ParseIntPipe, } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerDto } from './buyer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterError } from 'multer';
//import { Res } from '@nestjs/common';
import express from 'express';
import { join } from 'path';



@Controller('buyer')
export class BuyerController {
  constructor(private buyerService: BuyerService) {}


   

  //Get All Buyers
  @Get()
  findAll() {
    return this.buyerService.findAll();
  }

  //Get Buyer by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.buyerService.findOne(id);
  }

   // GET /buyer/email?email=someone@example.xyz
  @Get('search/by-email')
  searchByEmail(@Query('email') email: string) {
    console.log('Email received:', email);
    return this.buyerService.searchByEmail(email);
  }
 
  //Search Buyer by Name (Query)
  @Get('search/by-name')
  search(@Query('name') name: string) {
    return this.buyerService.searchByName(name);
  }

  //Get Buyer Count
  @Get('stats/count')
  count() {
    return this.buyerService.count();
  }
  
   //Create Buyer
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true})) 
  create(@Body() buyer: BuyerDto) {
    return this.buyerService.create(buyer);
  }
  
  // Create buyer and upload NID image (multipart/form-data)
  // Field names expected: name, email, address, phone, nidNumber, nidImage (file)
  @Post('register-with-nid')
  @UseInterceptors(
    FileInterceptor('nidImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          console.log('[MULTER] Saving file as:', uniqueName);
          cb(null, uniqueName);
        },
      }),
      fileFilter: (_req, file, cb) => {
         //console.log('[MULTER] Checking file type:', file.originalname);
        // allow common image types for NID image (jpg|jpeg|png|webp)
        if (file.originalname.match(/\.(jpg|jpeg|png|webp)$/i)) {
          cb(null, true);
        } else {
          console.error('[MULTER] Invalid file type:', file.originalname);
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'nidImage'), false);
        }
      },
      limits: {
        // 2 MB
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
   
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  registerWithNid(@Body() body: BuyerDto, @UploadedFile() file: Express.Multer.File) {
    
  // console.log('\n==============================');
  // console.log('[BUYER REGISTER WITH NID]');
  // console.log('Request Body:', body);
    
    // file may be undefined if not sent
    if (!file) {
      //console.error('[ERROR] File not uploaded or invalid format.');
      throw new BadRequestException('NID image is required and must be JPG/PNG/WebP and <= 2MB');
    }

    // console.log('Uploaded File Info:');
    // console.log({
    //   filename: file.filename,
    //   mimetype: file.mimetype,
    //   size: file.size,
    //   path: `./uploads/${file.filename}`,
    // });

    // optionally attach filename / path to buyer DTO
    const buyer: BuyerDto = {
      ...body,
      nidNumber: body.nidNumber,
      // keep phone/address/name/email from body; id assigned in service
    };

    // you can store file info with buyer, e.g. store path in buyer object
    // but since DTO has no file field, we can send separate response:
    const created = this.buyerService.create(buyer);
    
    //console.log('Buyer Created:', created);
    //console.log('==============================\n');
    return {
      message: 'Buyer registered with NID image',
      buyer: created.buyer || created,
      file: { filename: file.filename, size: file.size, path: `./uploads/${file.filename}` },
    };
  }

   
// Fetch NID image by filename
@Get('getimage/:name')
getImage(@Param('name') name: string, @Res() res: express.Response) {
  // Build full path to the uploads folder
  const imagePath = join(process.cwd(), 'uploads/', name);

  // Send the file
  return res.sendFile(imagePath, (err) => {
    if (err) {
      console.error('File not found at:', imagePath);
      res.status(404).json({ message: 'Image not found' });
    }
  });
}  

 // Update Buyer (PUT)
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: BuyerDto) {
    return this.buyerService.update(id, dto);
  }  

   

  // Partially Update Buyer (PATCH)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  patch(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<BuyerDto>) {
    // reusing update logic (service merges)
    return this.buyerService.update(id, dto as BuyerDto);
  } 
   

  //Delete Buyer
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.buyerService.remove(id);
  }


  //  Reset All Buyers
  @Delete()
  clear() {
    return this.buyerService.clear();
  }
}


