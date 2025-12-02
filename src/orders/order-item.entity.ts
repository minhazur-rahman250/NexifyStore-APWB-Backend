// src/orders/order-item.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../products/product.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (p) => p.orderItems)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column('int')
  quantity: number;

  @Column('numeric')
  price: number;
}
