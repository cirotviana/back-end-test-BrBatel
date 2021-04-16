import { Request, Response } from 'express';
import { getManager } from "typeorm";

import { Users, UserTypes } from "../models/users.model";
import { Companies, AnnualBilling } from "../models/companies.model";



export async function getCompanies(req: Request, res: Response) {

    getManager().find(Companies)
        .then((companies) => {
            res.send(companies)
        })
        .catch((err) => {
            res.send(err);
        });
}

export async function getCompanyById(req: Request, res: Response) {
    getManager().findOneOrFail(Companies, req.params.id)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err);
        });
}

export async function createCompany(req: Request, res: Response) {
    getManager().create(Companies, { 
        name: '',
        cnpj: '',
        demanda: '',
        faturamentoAnual: AnnualBilling.upTo10kk,
        sobre: '',


    })
        .save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err);
        });
}

function onResult(result: any, res: Response) {
    if (result)
        res.send(result)
    else
        res.send('')
}




/*     })        
    .catch((err) => {
        res.send(err);
    });

 */

/*     let companies = new Companies();

    companies.recover */

/*     const user = await getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.id = :id", { id: 1 })
    .getOne(); */



/* 
    let user = new Users ();

    user.name= 'Teste12'
    user.userName = 'teste2'
    user.email= 'teste2@exemplo.com'
    user.tipo= UserTypes.USER
    user.password= 'ajksdhajsdjkhajkhdfjkhdajksfhjkadshjkadhsfjkhadsjkfdjksafjkadsfkadsfk' 

    await user.save();*/

/*     res.send('ok!');

    for (let i = 0; i < 8; i++) {

        let company = new Companies ();

        company.name= 'Company'+i
        company.cnpj = '99.999.999/9999-9'+i
        company.demanda = '2.000,00'
        company.faturamentoAnual = AnnualBilling.upTo10kk
        company.sobre = "Empresa Criada em 2014."
    
        var companysaved = await company.save();
        
        console.log(companysaved);
    } */





/*     createConnection(dbConfig)
    .then((_connection)=>{

        let user = new Users ();

        user.name= 'Teste1'
        user.userName = 'teste1'
        user.email= 'teste@exemplo.com'
        user.tipo= UserTypes.ADMIN
        user.password= 'ajksdhajsdjkhajkhdfjkhdajksfhjkadshjkadhsfjkhadsjkfdjksafjkadsfkadsfk'
        
        user.save()
        .then((result: Users)=>{
            console.log(result);
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
    })
    .catch((err) => {
        res.send(err);
    });
 */

/*     createConnection(dbConfig)
    .then((_connection) => {
        //console.log(_connection.close());
        res.send('Conectado no db.');
        
        _connection.close()
    })
    .catch((err) => {
        res.send(err);
    }) */


function errReturn(res: Response) {
    return (err: Error) => { console.log(err); res.status(500).send(process.env.ERR500); };
}