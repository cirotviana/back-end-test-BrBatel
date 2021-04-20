import express from 'express';
import { Connection, createConnection } from 'typeorm';

import * as companiesController from '../controllers/companies.controller';

import dbConfig from '../../config/database';

const router = express.Router();

createConnection(dbConfig)
   .then((_connection: Connection) => {

      /**
       * Retorna a lista de empresas 
       * @Route GET /companies
       * @group Empresas  
       * @returns {Array<Companies>} 200 - Response success
       */
      router.get('/', companiesController.getCompanies);


      /**
       * Retorna empresa por ID
       * @Route GET /companies/:id
       * @group Empresas  
       * @returns {Companies} 200 - Response success
       */
      router.get('/:id', companiesController.getCompanyById);


      /**
      * Cadastra empresa 
      * @Route POST /companies
      * @group Empresas  
      * @returns {   message: process.env.COMPANY_ADDED,
      *              id: company_id
      *          } 200 - Response success
      */
      router.post('/', companiesController.createCompany);


      /**
       * Atualiza empresa por Id.
       * @Route PUT /companies/:id
       * @group Empresas  
       * @returns {   message: process.env.COMPANY_UPDATED,
       *              id: company_id
          *          } 200 - Response success
          */
      router.put('/:id', companiesController.updateCompany);


      /**
       * Exclui empresa por Id.
       * @Route DELETE /companies/:id
       * @group Empresas  
       * @returns {   message: process.env.COMPANY_DELETED,
       *              id: company_id
          *          } 200 - Response success
          */
      router.delete('/:id', companiesController.deleteCompany);




   }).catch((err: any) => { console.log('Erro na conexão com o BD.\n' + err) })


export default router;
