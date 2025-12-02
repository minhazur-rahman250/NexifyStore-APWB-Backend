 import { Entity, Column, PrimaryColumn, BeforeInsert,  } from 'typeorm';
 

@Entity('buyer')
export class BuyerEntity {
  @PrimaryColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  // ========== FULL NAME (Nullable) ==========
  @Column({
    name: 'fullName',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  name: string | null;

  // ========== EMAIL ==========
  @Column({ type: 'varchar', length: 150 })
  email: string;

  // ========== ADDRESS ==========
  @Column({ type: 'varchar', length: 255 })
  address: string;

  // ========== PHONE (BigInt Storage) ==========
  @Column({ type: 'bigint', nullable: true })
  phone: string | null;

  // ========== NID NUMBER ==========
  @Column({ type: 'varchar', length: 20 })
  nidNumber: string;

  // ========== AUTO GENERATE ID BEFORE INSERT ==========
  @BeforeInsert()
  generateId() {
    // Generate 6-digit random ID
    this.id = Math.floor(Math.random() * 900000 + 100000);
  }

   
}
