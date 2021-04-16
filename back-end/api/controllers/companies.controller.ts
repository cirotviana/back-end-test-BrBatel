import { Request, Response } from 'express';
import { DeleteResult, getManager, QueryFailedError } from "typeorm";

import { Users, UserTypes } from "../models/users.model";
import { Companies, AnnualBilling } from "../models/companies.model";



export function getCompanies(req: Request, res: Response) {
    getManager().find(Companies)
        .then((companies) => {
            res.send(companies)
        })
        .catch((err) => {
            dbErrorHandler(err, res);
        });
}

export function getCompanyById(req: Request, res: Response) {
    getManager().findOneOrFail(Companies, req.params.id)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            dbErrorHandler(err, res);
        });
}

export function createCompany(req: Request, res: Response) {
    getManager()
        .create(Companies, req.body)
        .save()
        .then((result) => {
            res.send({
                'message': process.env.COMPANY_ADDED,
                'id': result.id
            })
        })
        .catch((err) => {
            dbErrorHandler(err, res);
        });
}

export function updateCompany(req: Request, res: Response) {
    let partialEntity = {};
    Object.assign(partialEntity, req.body);
    getManager().findOneOrFail(Companies, req.params.id)
        .then((result: Companies) => {
            getManager().update(Companies, req.params.id, partialEntity)
                .then((result) => {
                    res.send({
                        'message': process.env.COMPANY_UPDATED,
                        'id': req.params.id
                    })
                }).catch((err) => {dbErrorHandler(err, res);});
        })
        .catch((err) => {dbErrorHandler(err, res);});
}


export function deleteCompany(req: Request, res: Response) {
    getManager().findOneOrFail(Companies, req.params.id)
        .then((result: Companies) => {
            getManager().delete(Companies, req.params.id)
                .then((result: DeleteResult) => {
                    console.log(result);
                    
                    res.send({
                        'message': process.env.COMPANY_DELETED,
                        'id': req.params.id
                    })
                }).catch((err) => {dbErrorHandler(err, res);});
        })
        .catch((err) => {dbErrorHandler(err, res);});
  }
  


export function dbErrorHandler(err: any, res: Response) {
    if (err.name === "QueryFailedError")
        res.status(400).send({
            name: err.name,
            message: err.message,
            detail: err.detail
        })
    else if (err.name === "EntityNotFound")
        res.status(404).send(err);
    else
        res.status(500).send({
            name: "IntenalServerError",
            message: process.env.ERR500,
            //err: err
        })
}