import axios, { AxiosInstance } from 'axios';
import { Companies } from 'models/companies.model';


const API: AxiosInstance = axios.create({ baseURL: 'http://localhost:3001/companies' });

export const getCompaniesApi = () => {
  
  return API.get('/');
}
export const updateCompanyApi = (company: Companies) => {
  return API.put('/' + company.id, company);
}
export const deleteCompanyApi = (company: Companies) => {
  return API.delete('/' + company.id);
}
export const saveCompanyApi = (company: Companies) => {
  return API.post('/', company)
}



export default API