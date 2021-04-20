
  export enum UserTypes {
    ADMIN = "ADMIN",
    USER = "USER",
}
  

  export class Users  {
    id!: number;
  
    userName!: string;
  
    name!: string;
  
    email!: string;

    password!: string;

    tipo!: UserTypes;
  
    createdAt!: Date;
  
    updatedAt!: Date;
  }