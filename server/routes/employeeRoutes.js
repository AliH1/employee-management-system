import { Router  } from 'express';
import { checkLoginCredentials, registerEmployee, getEmployees, updateEmployee, changePassword } from '../controllers/employeeController.js';

const employeeRouter = Router();

employeeRouter.post('/login', checkLoginCredentials);
employeeRouter.post('/registerEmployee', registerEmployee);
employeeRouter.get('/employeeList', getEmployees);
employeeRouter.put('/updateEmployee', updateEmployee);
employeeRouter.put('/changePassword', changePassword);

export default employeeRouter;