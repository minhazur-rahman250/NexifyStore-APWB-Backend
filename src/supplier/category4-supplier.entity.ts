// src/supplier/entities/category4-supplier.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { SupplierStockEntity } from './supplier-stock.entity';

@Entity('supplier_category4')
export class Category4Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @CreateDateColumn({ type: 'timestamp' })
  joiningDate: Date;

  @Column({ type: 'varchar', length: 30, default: 'Unknown' })
  country: string;

  @OneToMany(() => SupplierStockEntity, (stock) => stock.category4Supplier)
  stocks: SupplierStockEntity[];
}
