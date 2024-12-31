import { Router } from 'express';
import { getAllEmployeeMessages, createEmployeeMessage } from '../controllers/employeeMessageController.js';

const employeeMessageRouter = Router();

employeeMessageRouter.get('/allEmployeeMessages', getAllEmployeeMessages);
employeeMessageRouter.post('/createEmployeeMessage', createEmployeeMessage);

export default employeeMessageRouter;