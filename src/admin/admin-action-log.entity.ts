import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, BeforeInsert, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../auth/user.entity';
import { BuyerEntity } from 'src/buyer/buyer.entity';

@Entity('admin_action_logs')
export class AdminActionLogEntity {
  @PrimaryGeneratedColumn()
  actionId: number;

  // ========== ADMIN ID (Foreign Key) ==========
  @Column({ type: 'uuid' })
  adminId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'adminId' })
  admin: UserEntity;

  // ========== TARGET USER ID (Foreign Key) ==========
  @Column({ type: 'uuid' })
  targetUserId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'targetUserId' })
  targetUser: UserEntity;

  @Column({
    type: 'enum',
    enum: ['Approve', 'Suspend', 'Reject', 'Warn', 'Delete', 'Ban'],
    default: 'Warn',
  })
  actionType: 'Approve' | 'Suspend' | 'Reject' | 'Warn' | 'Delete' | 'Ban';

  // ========== COMMENTS ==========
  @Column({ type: 'text', nullable: true })
  comments: string;

  // ========== CREATED AT ==========
  @CreateDateColumn()
  createdAt: Date;

  



}

 





