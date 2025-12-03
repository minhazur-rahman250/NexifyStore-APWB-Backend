import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';
 
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
 
  // POST /orders  -> buyerId + items order create
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }
 
  // GET /orders  ->   order
  @Get()
  findAll() {
    return this.orderService.findAll();
  }
 
  // GET /orders/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }
}