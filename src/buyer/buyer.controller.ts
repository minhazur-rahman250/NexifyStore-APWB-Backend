import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';

@Controller('buyer')
export class BuyerController {
    constructor(private readonly buyerService: BuyerService) {}


@Post()
create(@Body() body: CreateBuyerDto) {
return { status: 'success', data: this.buyerService.create(body) };
}


@Get()
findAll(@Query('isActive') isActive?: string, @Query('page') page?: string, @Query('limit') limit?: string) {
const result = this.buyerService.findAll({
isActive: isActive === undefined ? undefined : isActive === 'true',
page: page ? Number(page) : undefined,
limit: limit ? Number(limit) : undefined
});
return { status: 'success', ...result };
}


@Get(':id')
findOne(@Param('id') id: string) {
return { status: 'success', data: this.buyerService.findOne(id) };
}


@Put(':id')
replace(@Param('id') id: string, @Body() body: UpdateBuyerDto) {
return { status: 'success', data: this.buyerService.update(id, body) };
}


@Patch(':id')
partial(@Param('id') id: string, @Body() body: Partial<UpdateBuyerDto>) {
return { status: 'success', data: this.buyerService.update(id, body) };
}


@Patch(':id/activate')
activate(@Param('id') id: string, @Body('isActive') isActive: boolean) {
return { status: 'success', data: this.buyerService.activate(id, isActive) };
}


@Delete(':id')
remove(@Param('id') id: string) {
return { status: 'success', data: this.buyerService.remove(id) };
}


@Get('search')
search(@Query('q') q: string) {
return { status: 'success', ...this.buyerService.search(q) };
}
}

