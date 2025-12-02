// src/transactions/transaction.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from '../orders/order.entity';
import { UserEntity } from '../auth/user.entity';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => OrderEntity, (order) => order.transaction)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => UserEntity, (u) => u.buyerTransactions)
  @JoinColumn({ name: 'buyer_id' })
  buyer: UserEntity;

  @ManyToOne(() => UserEntity, (u) => u.sellerTransactions)
  @JoinColumn({ name: 'seller_id' })
  seller: UserEntity;

  @Column('numeric')
  amount: number;

  @Column({
    type: 'enum',
    enum: ['Card', 'Bkash', 'Nagad', 'CashOnDelivery'],
  })
  paymentMethod: string;

  @Column({
    type: 'enum',
    enum: ['Success', 'Failed', 'Pending'],
    default: 'Pending',
  })
  status: string;
}
