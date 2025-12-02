// src/supplier/entities/supplier-stock.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../auth/user.entity';
import { ProductEntity } from '../products/product.entity';
import { Category4Supplier } from './category4-supplier.entity';

@Entity('supplier_stocks')
export class SupplierStockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // main supplier user
  @ManyToOne(() => UserEntity, (u) => u.supplierStocks)
  @JoinColumn({ name: 'supplier_id' })
  supplier: UserEntity;

  // lab-এর Category4Supplier এর সাথে relation দেখাতে চাইলে
  @ManyToOne(() => Category4Supplier, (c) => c.stocks, { nullable: true })
  @JoinColumn({ name: 'category4_supplier_id' })
  category4Supplier: Category4Supplier;

  @ManyToOne(() => ProductEntity, (p) => p.supplierStocks)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column('int')
  quantity: number;

  @Column('numeric')
  price: number;
}
