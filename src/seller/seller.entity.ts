import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('seller')
export class SellerEntity {
  @PrimaryColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  fullName: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'bigint', nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 20 })
  nidNumber: string;

  @Column({ type: 'varchar', default: 'active' })
  status: string;

  @Column({ type: 'varchar', default: 'seller' })
  role: string;

  @BeforeInsert()
  generateId() {
    this.id = Math.floor(Math.random() * 900000 + 100000);
  }
}
