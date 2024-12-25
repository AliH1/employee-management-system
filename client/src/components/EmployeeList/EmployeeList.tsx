import * as React from 'react';
import { List } from './TestEmployees';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 160 },
  { field: 'email', headerName: 'Email', width: 180 },
  { field: 'phone', headerName: 'Phone', width: 130 },
  { field: 'department', headerName: 'Department', width: 70 },
  { field: 'status', headerName: 'Status', width: 70 },
];

const rows = List;
const paginationModel = { page: 0, pageSize: 5 };

export default function EmployeeList() {
  return (
    <Paper>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}