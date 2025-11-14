import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';

@Entity('admin')
export class AdminEntity {
  @PrimaryColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 150 })
  fullName: string;

  @Column({ default: false })
  isActive: boolean;
  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 11 })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fileName: string | null;

  @BeforeInsert()
  generateId() {
    this.id = Math.floor(Math.random() * 900000 + 100000); 
  }
}