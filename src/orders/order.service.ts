import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderItemEntity } from './order-item.entity';
import { UserEntity } from '../auth/user.entity';
import { ProductEntity } from '../products/product.entity';
import { CreateOrderDto } from './order.dto';
 
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepo: Repository<OrderItemEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}
 
  async create(dto: CreateOrderDto) {
    const buyer = await this.userRepo.findOne({ where: { id: dto.buyerId } });
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }
 
    // order entity create
    const order = this.orderRepo.create({
      buyer,
      totalAmount: 0,
      orderStatus: 'Pending',
      paymentStatus: 'Pending',
    });
    const savedOrder = await this.orderRepo.save(order);
 
    let total = 0;
    const items: OrderItemEntity[] = [];
 
    for (const item of dto.items) {
      const product = await this.productRepo.findOne({ where: { id: item.productId } });
      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }
 
      const orderItem = this.orderItemRepo.create({
        order: savedOrder,
        product,
        quantity: item.quantity,
        price: item.price,
      });
      total += item.price * item.quantity;
      items.push(orderItem);
    }
 
    await this.orderItemRepo.save(items);
    savedOrder.totalAmount = total;
    await this.orderRepo.save(savedOrder);
 
    return {
      message: 'Order created',
      data: await this.orderRepo.find({
        where: { id: savedOrder.id },
        relations: ['buyer', 'items', 'items.product'],
      }),
    };
  }
 
  async findAll() {
    const orders = await this.orderRepo.find({
      relations: ['buyer', 'items', 'items.product'],
    });
    return { message: 'Orders fetched', data: orders, count: orders.length };
  }
 
  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['buyer', 'items', 'items.product'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return { message: 'Order found', data: order };
  }
}