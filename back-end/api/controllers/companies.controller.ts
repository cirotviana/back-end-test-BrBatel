
const { validationResult } = require('express-validator');


export function getCompanies(req: any, res: { send: (arg0: string) => void; }) {
    res.send('End point Não implementado ainda.');
}

function errReturn(res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string | undefined): any; new(): any; }; }; }) {

    return (err: any) => { console.log(err); return res.status(500).send(process.env.ERR500); };
}