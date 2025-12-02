// src/products/product.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../auth/user.entity';
import { CategoryEntity } from './category.entity';
import { ReviewEntity } from './review.entity';
import { OrderItemEntity } from '../orders/order-item.entity';
import { CartItemEntity } from '../cart/cart-item.entity';
import { SupplierStockEntity } from '../supplier/supplier-stock.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column('numeric')
  price: number;

  @Column('int')
  stock: number;

  @ManyToOne(() => CategoryEntity, (cat) => cat.products, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  // Seller owner
  @ManyToOne(() => UserEntity, (u) => u.products)
  @JoinColumn({ name: 'seller_id' })
  seller: UserEntity;

  @OneToMany(() => ReviewEntity, (r) => r.product)
  reviews: ReviewEntity[];

  @OneToMany(() => OrderItemEntity, (item) => item.product)
  orderItems: OrderItemEntity[];

  @OneToMany(() => CartItemEntity, (item) => item.product)
  cartItems: CartItemEntity[];

  @OneToMany(() => SupplierStockEntity, (stock) => stock.product)
  supplierStocks: SupplierStockEntity[];

  @ManyToMany(() => UserEntity, (u) => u.suppliedProducts)
  suppliers: UserEntity[];
  Category4Suppliers: any;
}
