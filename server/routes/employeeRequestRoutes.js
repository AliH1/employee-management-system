import { Router } from 'express';
import { getAllEmployeeRequests, createEmployeeRequest, updateEmployeeRequest, getEmployeeRequests } from '../controllers/employeeRequestController.js';

const employeeRequestRouter = Router();

employeeRequestRouter.get('/allEmployeeRequests', getAllEmployeeRequests);
employeeRequestRouter.post('/createEmployeeRequest', createEmployeeRequest);
employeeRequestRouter.put('/updateEmployeeRequest', updateEmployeeRequest);
employeeRequestRouter.get('/myEmployeeRequests', getEmployeeRequests);

export default employeeRequestRouter