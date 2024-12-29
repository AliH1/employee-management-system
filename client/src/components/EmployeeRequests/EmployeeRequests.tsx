import { useState } from 'react';
import { RequestType } from '../../types/types';
import EmployeeRequest from '../EmployeeRequest/EmoloyeeRequest';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {List } from './RequestList';

export default function EmployeeRequests() {
  const [requests, setRequests] = useState<RequestType[]>(List);

  const handleStatusUpdate = (id: number, status: string) => {
    const updatedRequests = requests.map((request) => {
      if(request.id === id)
        return {...request, status: status};
      return request;
    });
    setRequests(updatedRequests);
    //update Status in DB using the id
  }

  return (
    <Box className='flex flex-col items-center'>
      <Typography variant='h5' className='text-center'>Employee Requests</Typography>
      <Stack className='p-4 gap-16 w-4/5'>
        {requests.map((request) => <EmployeeRequest key={request.id} {...request} handleStatusUpdate={handleStatusUpdate}/>)}
      </Stack>
    </Box>
  );
}