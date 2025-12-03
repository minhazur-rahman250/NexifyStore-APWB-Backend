import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './cart.dto';
 
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
 
  // POST /cart/add
  @Post('add')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  addToCart(@Body() dto: AddToCartDto) {
    return this.cartService.addToCart(dto);
  }
 
  // GET /cart?buyerId=...
  @Get()
  getCart(@Query('buyerId') buyerId: string) {
    return this.cartService.getCart(buyerId);
  }
 
  // DELETE /cart/item/:id
  @Delete('item/:id')
  removeItem(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.removeItem(id);
  }
 
  // DELETE /cart/clear?buyerId=...
  @Delete('clear')
  clearCart(@Query('buyerId') buyerId: string) {
    return this.cartService.clearCart(buyerId);
  }
}