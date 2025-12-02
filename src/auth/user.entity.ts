import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ProductEntity } from '../products/product.entity';
// import { SupplierStockEntity } from 'src/supplier/supplier-stock.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'seller', 'buyer', 'supplier'],
    default: 'buyer',
  })
  role: 'admin' | 'seller' | 'buyer' | 'supplier';

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: 'active' | 'inactive';

  @CreateDateColumn()
  createdAt: Date;
    createdCategories: any;
    products: any;
    reviews: any;

  // ========== BCrypt Password Hashing ==========
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Compare password with hashed password
  async comparePassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }



// ========== Supplier side relations ==========
 
  // @OneToMany(() => SupplierStockEntity, (stock) => stock.supplier)
  // supplierStocks: SupplierStockEntity[];



  // ManyToMany (optional) -> UserEntity side

 
// @ManyToMany(() => ProductEntity, (p) => p.suppliers)
// @JoinTable({
//   name: 'supplier_products',
//   joinColumn: { name: 'supplier_id', referencedColumnName: 'id' },
//   inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
// })
// suppliedProducts: ProductEntity[];

}
