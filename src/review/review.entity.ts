// src/products/review.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from '../products/product.entity';
import { UserEntity } from '../auth/user.entity';
@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (p) => p.reviews)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (u) => u.reviews)
  @JoinColumn({ name: 'buyer_id' })
  buyer: UserEntity;

  @Column('int')
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;
}
