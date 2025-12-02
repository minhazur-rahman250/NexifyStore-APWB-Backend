// // src/supplier/entities/supplier-stock.entity.ts
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';
// import { UserEntity } from '../auth/user.entity';
// import { ProductEntity } from '../products/product.entity';
 
// @Entity('supplier_stocks')
// export class SupplierStockEntity {
//   @PrimaryGeneratedColumn()
//   id: number;
 
//   @ManyToOne(() => UserEntity, (u) => u.supplierStocks)
//   @JoinColumn({ name: 'supplier_id' })
//   supplier: UserEntity;
 
//   @ManyToOne(() => ProductEntity, (p) => p.supplierStocks)
//   @JoinColumn({ name: 'product_id' })
//   product: ProductEntity;
 
//   @Column('int')
//   quantity: number;
 
//   @Column('numeric')
//   price: number;
// }