  export enum AnnualBilling {
    upTo10kk = "Até R$ 10 milhões",
    upTo50kk = "De R$ 10 a R$ 50 milhões",
    upTo200kk = "De R$ 50 a R$ 200 milhões",
    upTo500kk = "De R$ 200 a R$ 500 milhões",
    moreThan500kk = "Acima de  R$ 500 milhões"
}

  export class Companies {
    id!: number;
  
    name!: string;

    cnpj!: string;

    demanda!: string;
    
    faturamentoAnual!: AnnualBilling;

    sobre!: string;
  
    createdAt!: Date;
  
    updatedAt!: Date;

    static checkIfAllDefined = (company : Companies) => {
      if(company.name && company.cnpj && company.demanda && company.faturamentoAnual && company.sobre) 
        return true;
      return false;
    }

  }

