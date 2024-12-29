import Box from '@mui/material/Box';
import { Employee } from '../../types/types';
import { BarChart } from '@mui/x-charts';
import { useMemo } from 'react';

export default function EmployeesChart({ employees }: { employees: Employee[] }) {
  let departments: string[] = [];
  let departmentSalaries: number[] = [];
  let departmentEmployees: number[] = [];

  const getDepartmentStats = () => {
    for(const employee of employees){
      if(employee.status !== 'Active') continue;
      if(!departments.includes(employee.department)){
        departments.push(employee.department);
        departmentSalaries.push(employee.salary);
        departmentEmployees.push(1);
      } else {
        const i = departments.indexOf(employee.department);
        departmentSalaries[i] += employee.salary;
        departmentEmployees[i] += 1;
      }
    }
  }
  useMemo(() => {
    getDepartmentStats();
  }, [employees]);

  return (
    <Box className='flex flex-row justify-center gap-4'>
      <BarChart className='p-6 border-2 border-gray-200'
        xAxis={[{ scaleType: 'band', data: departments }]}
        series={[{label: 'Employees', data: departmentEmployees}]}
        width={550}
        height={300} />
      <BarChart className='p-6 border-2 border-gray-200'
        xAxis={[{ scaleType: 'band', data: departments }]}
        series={[{ label: 'Total Salary', data: departmentSalaries }]}
        width={550}
        height={300} />
    </Box>
  )
}