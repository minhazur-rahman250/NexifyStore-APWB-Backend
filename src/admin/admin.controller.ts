import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AdminController {
  admins: any;
  constructor(private readonly adminService: AdminService) {}
#catagory3

  @Post('admin/create')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@UploadedFile() file: Express.Multer.File, @Body() adminDto: AdminDto) {
    if (file && file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Only PDF accepted.');
    }
    console.log('Uploaded file:', file);
    adminDto.file = file;
    return this.adminService.create(adminDto);
  }

  @Post('admin/create/:id')
  createEmail(@Param('id') id: object, @Query('email') email: object) {
    return this.adminService.postEmail({ id, email });
  }

  @Get('admin/all')
  findAll() {
    return this.adminService.findAll();
  }

  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Get('admin')
  findByEmail(@Query('email') email: string) {
    return this.adminService.findByEmail(email);
  }

  @Put('admin/update/:id')
  update(@Param('id') id: string, @Body() adminDto: AdminDto) {
    return this.adminService.update(+id, adminDto);
  }

  @Patch('admin/update-email/:id')
  updateEmail(@Param('id') id: string, @Query('email') email: string) {
    return this.adminService.patchEmail(+id, email);
  }

  @Delete('admin/delete/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @Delete('admin/delete-all')
  deleteAll() {
    return this.adminService.deleteAll();
  }
}










