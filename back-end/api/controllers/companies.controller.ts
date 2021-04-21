import { Request, Response } from 'express';
import { DeleteResult, getManager } from "typeorm";

import { Companies } from "../models/companies.model";



export function getCompanies(req: Request, res: Response) {
/*     const hasQueryParameters = Object.keys(req.query).length ? true : false;
    if (!hasQueryParameters) 
        getManager().find(Companies)
            .then((companies) => {
                res.send(companies)
            })
            .catch((err) => {
                dbErrorHandler(err, res);
            });
     else { */
        const {limitPerPage, skipRows} = configPagination(req);
        getManager()
            .find(Companies, {
                where: req.query, 
                take: limitPerPage,
                skip: skipRows
            })
            .then((companies: Array<Companies>) => {
                getManager()
                .count(Companies, {
                    where: req.query
                }).then((numCompanies)=>{
                    res.send({companies: companies, numCompanies: numCompanies})
                }).catch((err) => {
                    dbErrorHandler(err, res);
                });
            }).catch((err) => {
                dbErrorHandler(err, res);
            });
    //}
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
                }).catch((err) => { dbErrorHandler(err, res); });
        })
        .catch((err) => { dbErrorHandler(err, res); });
}

export function deleteCompany(req: Request, res: Response) {
    getManager().findOneOrFail(Companies, req.params.id)
        .then((result: Companies) => {
            getManager().delete(Companies, req.params.id)
                .then((result: DeleteResult) => {
                    res.send({
                        'message': process.env.COMPANY_DELETED,
                        'id': req.params.id
                    })
                }).catch((err) => { dbErrorHandler(err, res); });
        })
        .catch((err) => { dbErrorHandler(err, res); });
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

function configPagination(req: Request){
    const page = Number(req.query.page) || 1;
    const itemsPerPage = Number(req.query.limit) || undefined;
    let skipRows = itemsPerPage ? (page - 1) * itemsPerPage : 0;
    delete req.query.page;
    delete req.query.limit;
    return {limitPerPage: itemsPerPage, skipRows}
}