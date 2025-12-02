import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
// import { SupplierStockEntity } from './supplier-stock.entity';
import { UserEntity } from 'src/auth/user.entity';
import { ProductEntity } from 'src/products/product.entity';

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


   // UserEntity (supplier) এর সাথে 1:1
  // @OneToOne(() => UserEntity)
  // @JoinColumn({ name: 'user_id' })
  // user: UserEntity;
  // @OneToMany(() => SupplierStockEntity, (stock) => stock.supplier)
  //   supplierStocks: SupplierStockEntity[];

  @ManyToMany(() => ProductEntity, ProductEntity => ProductEntity.Category4Suppliers)
  @JoinTable()
    products: ProductEntity[];

}
