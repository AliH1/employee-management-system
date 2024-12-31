import axios from 'axios';
import { ChangePasswordType, Employee, EmployeeUser, LoginType, MessageType, RequestType, UpdateStatus } from '../types/types';


const apiUrl = 'http://localhost:8080/api/';

export const registerEmployee = async (employee: EmployeeUser) => {
  try {
    const res = await axios.post(`${apiUrl}employee/registerEmployee`, employee);
    return res.data;
  }
  catch (error) {
    return error;
  }
}

export const loginEmployee = async (employee: LoginType) => {
  try {
    const res = await axios.post(`${apiUrl}employee/login`, employee);
    return res.data;
  }
  catch (error) {
    return error;
  }
}

export const getEmployees = async () => {
  try {
    const res = await axios.get(`${apiUrl}employee/employeeList`);
    return res.data;
  }
  catch (error) {
    return error;
  }
}

export const updateEmployee = async (employee: Employee) => {
  try {
    const res = await axios.put(`${apiUrl}employee/updateEmployee`, employee);
    return res.data;
  }
  catch (error) {
    return error;
  }
}

export const changePassword = async (employee: ChangePasswordType) => {
  try {
    const res = await axios.put(`${apiUrl}employee/changePassword`, employee);
    return res.data;
  }
  catch (error) {
    return error;
  }
}

export const getAllEmployeeRequests = async () => {
  try {
    const res = await axios.get(`${apiUrl}employeeRequest/allEmployeeRequests`);
    return res.data;
  }
  catch (error) {
    return error;
  }
}

export const createEmployeeRequest = async (request: RequestType) => {
  const employeeRequest = {
    ...request,
    date: request.date.toDate()
  }
  try {
    const res = await axios.post(`${apiUrl}employeeRequest/createEmployeeRequest`, employeeRequest);
    return res.data;
  }
  catch (error) {
    return error;
  }
}

export const updateRequestStatus = async (request: UpdateStatus) => {
  try {
    const res = await axios.put(`${apiUrl}employeeRequest/updateEmployeeRequest`, request);
    return res.data;
  }
  catch (error) {
    return error;
  }
}

export const getMyEmployeeRequests = async (email: string) => {
  try {
    const res = await axios.get(`${apiUrl}employeeRequest/myEmployeeRequests`, {
      headers: {
        email: email
      }
    });
    return res.data;
  }
  catch (error) {
    return error;
  }
}

export const getAllEmployeeMessages = async () => {
  try {
    const res = await axios.get(`${apiUrl}employeeMessage/allEmployeeMessages`);
    return res.data;
  }
  catch (error) {
    return error;
  }
}

export const createEmployeeMessage = async (message: MessageType) => {
  const employeeMessage = {
    ...message,
    date: message.date.toDate()
  }
  try {
    const res = await axios.post(`${apiUrl}employeeMessage/createEmployeeMessage`, employeeMessage);
    return res.data;
  }
  catch (error) {
    return error;
  }
}