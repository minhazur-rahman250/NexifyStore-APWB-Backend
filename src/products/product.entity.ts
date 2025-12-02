// src/products/product.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
//import { ReviewEntity } from './review.entity';
//import { OrderItemEntity } from '../orders/order-item.entity';
//import { CartItemEntity } from '../cart/cart-item.entity';
// import { SupplierStockEntity } from '../supplier/supplier-stock.entity';
import { UserEntity } from '../auth/user.entity';
import { Category4Supplier } from 'src/supplier/supplier.entity';
 
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
 
  @ManyToOne(() => CategoryEntity, (cat) => cat.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
 
  // Seller owner (optional, যদি products seller এর হয়)
  @ManyToOne(() => UserEntity, (user) => user.products, { nullable: true })
  @JoinColumn({ name: 'seller_id' })
  seller: UserEntity;
 
  //@OneToMany(() => ReviewEntity, (r) => r.product)
  //reviews: ReviewEntity[];
 
  //@OneToMany(() => OrderItemEntity, (item) => item.product)
  //orderItems: OrderItemEntity[];
 
  //@OneToMany(() => CartItemEntity, (item) => item.product)
  //cartItems: CartItemEntity[];
 
//   @OneToMany(() => SupplierStockEntity, (stock) => stock.product)
//   supplierStocks: SupplierStockEntity[];
 
  // ManyToMany with suppliers (optional)
  @ManyToMany(() => Category4Supplier, Category4Supplier => Category4Supplier.products)
  @JoinTable()
  Category4Suppliers: Category4Supplier[];
    
}