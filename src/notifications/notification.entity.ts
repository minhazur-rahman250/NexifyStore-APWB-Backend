// src/notifications/notification.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../auth/user.entity';
import { ProductEntity } from '../products/product.entity';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (u) => u.notifications)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (p: ProductEntity) => p.notifications, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column()
  title: string;

  @Column('text')
  message: string;

  @Column({
    type: 'enum',
    enum: ['Read', 'Unread'],
    default: 'Unread',
  })
  status: string;
}
