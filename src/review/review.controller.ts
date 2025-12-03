import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './review.dto';
 
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
 
  // POST /reviews
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }
 
  // GET /reviews/product/:productId
  @Get('product/:productId')
  findByProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewService.findByProduct(productId);
  }
 
  // GET /reviews?buyerId=...
  @Get()
  findByBuyer(@Query('buyerId') buyerId: string) {
    return this.reviewService.findByBuyer(buyerId);
  }
}