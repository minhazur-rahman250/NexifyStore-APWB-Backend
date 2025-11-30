//buyer.entity.ts
import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';

@Entity('buyer')
export class BuyerEntity {
  @PrimaryColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  // fullName is nullable per lab spec (User Category 2)
  @Column({ name: 'fullName', type: 'varchar', length: 150, nullable: true })
  name: string | null;

  @Column()
  email: string

  @Column()
  address : string
  // store phone as string in DB to avoid JS number issues with bigints,
  // but the lab asked for bigint: if you want true bigint, set type: 'bigint'
  // @Column({ type: 'bigint', unsigned: true, nullable: true })
  // phone: string | null;
   

  @Column({ type: 'bigint' ,nullable: true })
  phone: string | null ; 
  
  @Column()
  nidNumber: string;
  @BeforeInsert()
  generateId() {
    // custom id generation as requested by lab
    this.id = Math.floor(Math.random() * 900000 + 100000); // 6-digit-ish id
  }
}
