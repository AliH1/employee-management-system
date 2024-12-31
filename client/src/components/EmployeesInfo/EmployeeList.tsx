import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Employee } from '../../types/types';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 160, editable: true},
  { field: 'email', headerName: 'Email', width: 160, editable: true},
  { field: 'phoneNumber', headerName: 'Phone Number', width: 130, editable: true},
  { field: 'department', headerName: 'Department', width: 100, editable: true},
  { field: 'position', headerName: 'Position', width: 160, editable: true},
  { field: 'startDate', type: 'date', headerName: 'start Date', width: 120, editable: true},
  { field: 'salary', type: 'number', headerName: 'Salary', width: 100,  editable: true,},
  { field: 'status', type: 'singleSelect' , headerName: 'Status', width: 150, valueOptions: ['Active', 'Inactive', 'Terminated'], editable: true},
];

const paginationModel = { page: 0, pageSize: 5 };

type EmployeeListProps = {
  employees: Employee[];
  handleUpdate: (employee: Employee) => void;
};

export default function EmployeeList({ employees, handleUpdate }: EmployeeListProps) {
  const processRowUpdate = (newRow: Employee) => {
    handleUpdate(newRow);
    return newRow;
  };
  return (
    <Paper className='border-2 border-gray-200'>
      <DataGrid
        getRowId={(row) => row._id}
        rows={employees}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20]}
        sx={{ border: 0 }}
        processRowUpdate={processRowUpdate}
      />
    </Paper>
  );
}