import { UserEntity } from 'src/auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

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

  @ManyToOne(() => UserEntity, user => user.approvedSuppliers)
  @JoinColumn({ name: 'approvedBy' })
  approvedBy: UserEntity;
}
