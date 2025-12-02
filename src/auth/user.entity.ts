import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ProductEntity } from 'src/products/product.entity';
import { TransactionEntity } from 'src/transactions/transaction.entity';
import { AdminActionLogEntity } from 'src/admin/admin-action-log.entity';
import { ReviewEntity } from 'src/products/review.entity';
import { CartEntity } from 'src/cart/cart.entity';
import { OrderEntity } from 'src/orders/order.entity';
import { SupplierStockEntity } from 'src/supplier/supplier-stock.entity';
import { NotificationEntity } from '../notifications/notification.entity';
  


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
  sellerTransactions: any;
  buyerTransactions: any;
    supplierStocks: any;

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

  // ========== Buyer side relations ==========

  @OneToMany(() => OrderEntity, (order) => order.buyer)
  ordersAsBuyer: OrderEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.buyer)
  carts: CartEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.buyer)
  Reviews: ReviewEntity[];

  @OneToMany(() => TransactionEntity, (t) => t.buyer)
  BuyerTransactions: TransactionEntity[];

  // ========== Seller side relations ==========

  @OneToMany(() => ProductEntity, (p) => p.seller)
  Products: ProductEntity[];

  @OneToMany(() => TransactionEntity, (t) => t.seller)
  SellerTransactions: TransactionEntity[];

  // ========== Supplier side relations ==========

  @OneToMany(() => SupplierStockEntity, (stock) => stock.supplier)
  SupplierStocks: SupplierStockEntity[];

  @ManyToMany(() => ProductEntity, (p) => p.suppliers)
  @JoinTable({
    name: 'supplier_products',
    joinColumn: { name: 'supplier_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  suppliedProducts: ProductEntity[];

  // ========== Admin side relations ==========

  @OneToMany(() => AdminActionLogEntity, (log) => log.admin)
  adminLogs: AdminActionLogEntity[];

  @OneToMany(() => AdminActionLogEntity, (log) => log.targetUser)
  targetLogs: AdminActionLogEntity[];

  @OneToMany(() => NotificationEntity, (n) => n.user)
  notifications: NotificationEntity[];
}


