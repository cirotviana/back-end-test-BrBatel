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
 * Retorna uma empresa pelo ID
 * @Route GET /companies/:id
 * @group Empresas  
 * @returns {Companies} 200 - Response success
 */
 router.get('/:id', companiesController.getCompanyById);


export default router;
