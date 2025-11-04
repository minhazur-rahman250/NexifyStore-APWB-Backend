import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerDto } from './buyer.dto';

@Controller('buyer')
export class BuyerController {
  constructor(private buyerService: BuyerService) {}

  // 2️⃣ Get All Buyers
  @Get()
  findAll() {
    return this.buyerService.findAll();
  }

  // 3️⃣ Get Buyer by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyerService.findOne(Number(id));
  }

  // 1️⃣ Create Buyer
  @Post()
  create(@Body() buyer: BuyerDto) {
    return this.buyerService.create(buyer);
  }
  
  // 4️⃣ Update Buyer (PUT)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: BuyerDto) {
    return this.buyerService.update(Number(id), dto);
  }

  // 5️⃣ Partially Update Buyer (PATCH)
  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: BuyerDto) {
    return this.buyerService.update(Number(id), dto);
  }

  // 6️⃣ Delete Buyer
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyerService.remove(Number(id));
  }

  // 7️⃣ Search Buyer by Name (Query)
  @Get('search/by-name')
  search(@Query('name') name: string) {
    return this.buyerService.searchByName(name);
  }

  // 8️⃣ Get Buyer Count
  @Get('stats/count')
  count() {
    return this.buyerService.count();
  }

  // (Optional) Reset All Buyers
  @Delete()
  clear() {
    return this.buyerService.clear();
  }
}
