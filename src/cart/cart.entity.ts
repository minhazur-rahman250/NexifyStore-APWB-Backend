// src/cart/cart.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../auth/user.entity';
import { CartItemEntity } from './cart-item.entity';

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (u) => u.carts)
  @JoinColumn({ name: 'buyer_id' })
  buyer: UserEntity;

  @OneToMany(() => CartItemEntity, (item) => item.cart)
  items: CartItemEntity[];
}
