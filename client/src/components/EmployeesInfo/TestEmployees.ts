import dayjs from 'dayjs';

const date: string = dayjs().format('MM/DD/YYYY');

export const List = [
  {id: 1, name: 'John Doe', email: 'Jhon@gmail.com', phone: '000-000-000', department: 'IT', position: 'full stack developer', dateHired: date, salary: 80000, status: 'Active'},
  {id: 2, name: 'Jane Doe', email: 'jane@gmail.com', phone: '421-334-111', department: 'IT', position: 'frontend developer', dateHired: date, salary: 90000, status: 'Active'},
  {id: 3, name: 'Jaime Doe', email: 'jaime@gmail.com', phone: '000-000-000', department: 'IT', position: 'backend developer', dateHired: date, salary: 70000, status: 'Active'},
  {id: 4, name: 'Jock Doe', email: 'jock@gmail.com', phone: '000-000-000', department: 'IT', position: 'product manager', dateHired: date, salary: 70000, status: 'Active'},
  {id: 5, name: 'Harry Doe', email: 'harry@gmail.com', phone: '000-000-000', department: 'IT', position: 'full stack developer', dateHired: date, salary: 160000, status: 'Active'},
  {id: 6, name: 'Matt Doe', email: 'Matt@gmail.com', phone: '000-000-000', department: 'IT', position: 'full stack developer', dateHired: date, salary: 110000, status: 'Terminated'},
  {id: 7, name: 'Megan Doe', email: 'Megan@gmail.com', phone: '000-000-000', department: 'IT', position: 'full stack developer', dateHired: date, salary: 120000, status: 'Inactive'},
  {id: 8, name: 'Ryan Doe', email: 'Ryan@gmail.com', phone: '000-000-000', department: 'Sales', position: 'sales specialist', dateHired: date, salary: 70000, status: 'Active'},
  {id: 9, name: 'Kelly Doe', email: 'Kelly@gmail.com', phone: '000-000-000', department: 'HR', position: 'HR specialist', dateHired: date, salary: 90000, status: 'Active'},
  {id: 10, name: 'Kate Doe', email: 'Kate@gmail.com', phone: '000-000-000', department: 'Marketing', position: 'graphic desinger',dateHired: date, salary: 70000, status: 'Active'},
];