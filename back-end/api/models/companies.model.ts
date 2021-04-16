import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
  } from "typeorm";

  export enum AnnualBilling {
    upTo10kk = "Até R$ 10 milhões",
    upTo50kk = "De R$ 10 a R$ 50 milhões",
    upTo200kk = "De R$ 50 a R$ 200 milhões",
    upTo500kk = "De R$ 200 a R$ 500 milhões",
    moreThan500kk = "Acima de  R$ 500 milhões"
}
  
  @Entity()
  export class Companies extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ nullable: false})
    name!: string;

  
    @Column({
              unique: true,
              nullable: false
            })
    cnpj!: string;

  
    @Column({
              type: "money",
              nullable: false
            })
    demanda!: string;
    

    @Column({
              type: "enum",
              enum: AnnualBilling,
              nullable: false
            })
    faturamentoAnual!: AnnualBilling;

    @Column({ nullable: false})
    sobre!: string;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;



  }