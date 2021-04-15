const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

import * as companiesController from '../controllers/companies.controller';



/**
 * Retorna a lista de empresas
 * @route GET /companies
 * @group Empresas  
 * @returns {object} 200 - Response success
 */
router.get('/', companiesController.getCompanies);


export default router;
