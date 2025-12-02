// src/orders/order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../auth/user.entity';
import { OrderItemEntity } from './order-item.entity';
import { TransactionEntity } from '../transactions/transaction.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (u) => u.ordersAsBuyer)
  @JoinColumn({ name: 'buyer_id' })
  buyer: UserEntity;

  @OneToMany(() => OrderItemEntity, (item) => item.order)
  items: OrderItemEntity[];

  @OneToOne(() => TransactionEntity, (t) => t.order)
  transaction: TransactionEntity;

  @Column('numeric')
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  })
  orderStatus: string;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Paid', 'Refunded'],
    default: 'Pending',
  })
  paymentStatus: string;
}
