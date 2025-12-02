// src/cart/cart-item.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CartEntity } from './cart.entity';
import { ProductEntity } from '../products/product.entity';

@Entity('cart_items')
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CartEntity, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @ManyToOne(() => ProductEntity, (p) => p.cartItems)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column('int')
  quantity: number;

  @Column('numeric')
  price: number;
}
