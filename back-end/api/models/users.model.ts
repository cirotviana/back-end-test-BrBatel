import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
  } from "typeorm";

  export enum UserTypes {
    ADMIN = "ADMIN",
    USER = "USER",
}
  
  @Entity()
  export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({unique: true})
    userName!: string;
  
    @Column()
    name!: string;
  
    @Column({unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column({
      type: "enum",
      enum: UserTypes,
      default: UserTypes.USER
    })
    tipo!: UserTypes;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }