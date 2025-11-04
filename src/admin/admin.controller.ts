import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('admin/create')
  create(@Body() adminDto: AdminDto) {
    return this.adminService.create(adminDto);
  }

   @Get('admin/all')
  findAll() {
    return this.adminService.findAll();
  }

  @Get('admin:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }


  @Patch('admin/update:id')
  update(@Param('id') id: string, @Body() adminDto: AdminDto) {
    return this.adminService.update(+id, adminDto);
  }

  @Delete('admin/delete:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }



  }

