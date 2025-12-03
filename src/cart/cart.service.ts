import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './cart.entity';
import { CartItemEntity } from './cart-item.entity';
import { UserEntity } from '../auth/user.entity';
import { ProductEntity } from '../products/product.entity';
import { AddToCartDto } from './cart.dto';
 
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepo: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepo: Repository<CartItemEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}
 
  private async getOrCreateCart(buyerId: string) {
    let cart = await this.cartRepo.findOne({
      where: { buyer: { id: buyerId } },
      relations: ['buyer'],
    });
 
    if (!cart) {
      const buyer = await this.userRepo.findOne({ where: { id: buyerId } });
      if (!buyer) throw new NotFoundException('Buyer not found');
      cart = this.cartRepo.create({ buyer });
      cart = await this.cartRepo.save(cart);
    }
 
    return cart;
  }
 
  async addToCart(dto: AddToCartDto) {
    const cart = await this.getOrCreateCart(dto.buyerId);
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');
 
    const item = this.cartItemRepo.create({
      cart,
      product,
      quantity: dto.quantity,
      price: dto.price,
    });
 
    const saved = await this.cartItemRepo.save(item);
    return { message: 'Item added to cart', data: saved };
  }
 
  async getCart(buyerId: string) {
    const cart = await this.cartRepo.findOne({
      where: { buyer: { id: buyerId } },
      relations: ['buyer', 'items', 'items.product'],
    });
    if (!cart) {
      return { message: 'Cart empty', data: null };
    }
    return { message: 'Cart fetched', data: cart };
  }
 
  async removeItem(id: number) {
    const item = await this.cartItemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Cart item not found');
    await this.cartItemRepo.remove(item);
    return { message: 'Cart item removed' };
  }
 
  async clearCart(buyerId: string) {
    const cart = await this.cartRepo.findOne({
      where: { buyer: { id: buyerId } },
      relations: ['items'],
    });
    if (!cart) return { message: 'Cart already empty' };
 
    await this.cartItemRepo.remove(cart.items);
    return { message: 'Cart cleared' };
  }
}