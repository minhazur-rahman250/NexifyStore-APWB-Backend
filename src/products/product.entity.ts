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
import { CategoryEntity } from '../category/category.entity';
import { ReviewEntity } from '../review/review.entity';
import { OrderItemEntity } from '../orders/order-item.entity';
import { CartItemEntity } from '../cart/cart-item.entity';
import { SupplierStockEntity } from '../supplier/supplier-stock.entity';
import { NotificationEntity } from '../notifications/notification.entity';

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

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'timestamptz', nullable: true })
  addedDate?: Date;

  @Column({ type: 'varchar', nullable: true })
  socialLink?: string;

  @ManyToOne(() => CategoryEntity, (cat) => cat.products, { nullable: true }) //supplier
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => NotificationEntity, (n) => n.product)//Admin
  notifications: NotificationEntity[];

  
  @ManyToOne(() => UserEntity, (u) => u.products)//seller
  @JoinColumn({ name: 'seller_id' })
  seller: UserEntity;

  @OneToMany(() => ReviewEntity, (r) => r.product)//buyer
  reviews: ReviewEntity[];

  @OneToMany(() => OrderItemEntity, (item) => item.product)//buyer
  orderItems: OrderItemEntity[];

  @OneToMany(() => CartItemEntity, (item) => item.product)//buyer
  cartItems: CartItemEntity[];

  @OneToMany(() => SupplierStockEntity, (stock) => stock.product)//supplier
  supplierStocks: SupplierStockEntity[];

  @ManyToMany(() => UserEntity, (u) => u.suppliedProducts)//supplier
  suppliers: UserEntity[];
  Category4Suppliers: any;
   //notifications: any;
}
