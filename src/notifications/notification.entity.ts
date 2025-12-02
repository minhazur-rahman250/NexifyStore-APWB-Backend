// src/notifications/notification.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../auth/user.entity';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (u) => u.notifications)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

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
