// src/products/category.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from '../auth/user.entity';
 
@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({ length: 100 })
  name: string;
 
  @Column({ type: 'text', nullable: true })
  description: string;
 
  @ManyToOne(() => UserEntity, (u) => u.createdCategories, { nullable: true })
  @JoinColumn({ name: 'created_by_admin_id' })
  createdByAdmin: UserEntity;
 
  @OneToMany(() => ProductEntity, (p) => p.category)
  products: ProductEntity[];
}