import express from 'express';

import * as companiesController from '../controllers/companies.controller';
import { Companies } from '../models';

const router = express.Router();


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
   




export default router;
