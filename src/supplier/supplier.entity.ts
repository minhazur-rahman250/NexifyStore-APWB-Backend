import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn } from 'typeorm';

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
}
