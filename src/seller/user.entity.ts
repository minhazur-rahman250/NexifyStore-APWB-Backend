import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('seller_users')
export class SellerUserEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'int', unsigned: true })
  age: number;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: 'active' | 'inactive';
}
