
import { List } from './TestEmployees';
import { useState } from 'react';
import Box from '@mui/material/Box';
import EmployeeList from './EmployeeList';
import { Employee} from '../../types/types';
import EmployeesChart from './EmployeesChart';

export default function EmployeesInfo() {
  const [employees, setEmployees] = useState<Employee[]>(List);

  const handleUpdate = (changedEmployee: Employee) => {
    //Update in DB
    const index = employees.findIndex(employee => employee.id === changedEmployee.id);
    const updatedEmployees = [...employees];
    updatedEmployees[index] = changedEmployee;
    setEmployees(updatedEmployees);
  }

  return (
    <Box className='flex flex-col items-center gap-4'>
      <EmployeesChart employees={employees} />
      <EmployeeList employees={employees} handleUpdate={handleUpdate}/>
    </Box>
  );
}