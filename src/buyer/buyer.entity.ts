import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
 
@Entity("buyer")
export class BuyerEntity{
 @PrimaryGeneratedColumn()
 id: number;

 @Column({default: "true"})
 isActive: boolean;

 @Column({name: "fullName", type: "varchar" , length: "50"})
 name: string;
 
 @Column({type: "bigint" })
 phone: string;
 
//  @Column()
//  @Generated("uuid")
//  uuid: string;

 @BeforeInsert()
 generatedId() {
    this.id = Math.floor(Math.random() * 1000);
 }
  
 }
