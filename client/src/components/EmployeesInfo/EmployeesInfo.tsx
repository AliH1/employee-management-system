
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import EmployeeList from './EmployeeList';
import { Employee, EmployeeUser} from '../../types/types';
import EmployeesChart from './EmployeesChart';
import { getEmployees, updateEmployee } from '../../api/api';

export default function EmployeesInfo() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() =>{
    const fetchEmployees = async () => {
      const employees = await getEmployees();
      if(employees.message === 'Employees fetched successfully'){
        const employeeList: Employee[] = employees.employees.map((employee: EmployeeUser) =>  {
          return {
            _id: employee._id,
            name: employee.name,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            position: employee.position,
            department: employee.department,
            startDate: new Date(employee.startDate),
            salary: employee.salary,
            status: employee.status
          };
        });
        setEmployees(employeeList);
      }
      else{
        console.log('Error fetching employees');
      }
    }
    fetchEmployees();
  }, []);

  const handleUpdate = async (changedEmployee: Employee) => {
      const update = await updateEmployee(changedEmployee);
      if(update.message === 'Employee updated successfully'){
        const index = employees.findIndex(employee => employee._id === changedEmployee._id);
        const updatedEmployees = [...employees];
        updatedEmployees[index] = changedEmployee;
        setEmployees(updatedEmployees);
      }
      else{
        console.log('Error updating employee status');
      }
  }

  return (
    <Box className='flex flex-col items-center gap-4'>
      <EmployeesChart employees={employees} />
      <EmployeeList employees={employees} handleUpdate={handleUpdate}/>
    </Box>
  );
}