import express, { json, urlencoded } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
var cors = require('cors');

//Environment Variables Midleware
import { config } from 'dotenv';
config();



import companiesRouter from './api/routes/companies.route';

const app = express();

app.use(cors())

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/companies', companiesRouter);


export default app;
