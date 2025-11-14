import {Body,Controller,Delete,Get,Param,Patch,Post,Put,Query,
UploadedFile,UseInterceptors,ValidationPipe,UsePipes,BadRequestException,} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('admin/create')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@UploadedFile() file: Express.Multer.File, @Body() adminDto: AdminDto) {
    if (file && file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Only PDF accepted.');
    }

    adminDto.file = file;
    return this.adminService.create(adminDto);
  }

  @Get('admin/all')
  findAll() {
    return this.adminService.findAll();
  }

  @Get('admin')
  findByEmail(@Query('email') email: string) {
    return this.adminService.findByEmail(email);
  }

  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
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


  @Get('search')
  findByFullName(@Query('q') substring: string) {
    return this.adminService.findByFullName(substring);
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.adminService.findByUsername(username);
  }

  @Delete(':username')
  removeByUsername(@Param('username') username: string) {
    return this.adminService.removeByUsername(username);
  }
}