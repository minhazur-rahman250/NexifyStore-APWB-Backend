import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './review.entity';
import { UserEntity } from '../auth/user.entity';
import { ProductEntity } from '../products/product.entity';
import { CreateReviewDto } from './review.dto';
 
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepo: Repository<ReviewEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}
 
  async create(dto: CreateReviewDto) {
    const buyer = await this.userRepo.findOne({ where: { id: dto.buyerId } });
    if (!buyer) throw new NotFoundException('Buyer not found');
 
    const product = await this.productRepo.findOne({ where: { id: dto.productId  } });
    if (!product) throw new NotFoundException('Product not found');
 
    const review = this.reviewRepo.create({
      buyer,
      product,
      rating: dto.rating,
      comment: dto.comment,
    });
 
    const saved = await this.reviewRepo.save(review);
    return { message: 'Review created', data: saved };
  }
 
  async findByProduct(productId: number) {
    const list = await this.reviewRepo.find({
      where: { product: { id: productId } },
      relations: ['buyer', 'product'],
    });
    return { message: 'Reviews for product', data: list, count: list.length };
  }
 
  async findByBuyer(buyerId: string) {
    const list = await this.reviewRepo.find({
      where: { buyer: { id: buyerId } },
      relations: ['buyer', 'product'],
    });
    return { message: 'Reviews by buyer', data: list, count: list.length };
  }
}