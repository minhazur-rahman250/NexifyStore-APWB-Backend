import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
 
@Entity("buyer")
export class BuyerEntity{
 @PrimaryGeneratedColumn()
 id: number;
 @Column()
 name: string;
 @Column()
 email: string;
 @Column()
 address: string;
 @Column()
 phone: string;
 @Column()
 nidNumber: string;
 }
