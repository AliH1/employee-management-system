import { useEffect, useState } from 'react';
import { RequestType } from '../../types/types';
import EmployeeRequest from '../EmployeeRequest/EmoloyeeRequest';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { getAllEmployeeRequests, updateRequestStatus } from '../../api/api';
import dayjs from 'dayjs';

export default function EmployeeRequests() {
  const [requests, setRequests] = useState<RequestType[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const allRequests = await getAllEmployeeRequests();
      if(allRequests.message === 'Requests fetched successfully') {
        allRequests.requests.forEach((request: RequestType) => {
          request.date = dayjs(request.date);
        });
        setRequests(allRequests.requests);
      }
      else{
        console.log('Error fetching requests');
      }
    }
    fetchRequests();
  } ,[]);

  const handleStatusUpdate = async (_id: string, status: string) => {
    const updateStatus = await updateRequestStatus({_id, status});
    if(updateStatus.message === 'Employee request updated successfully'){
      const updatedRequests = requests.map((request) => {
        if(request._id === _id)
          return {...request, status: status};
        return request;
      });
      setRequests(updatedRequests);
    }
    else {
      console.log(updateStatus.response.data.message);
    }
  }

  return (
    <Box className='flex flex-col items-center'>
      <Typography variant='h5' className='text-center'>Employee Requests</Typography>
      <Stack className='p-4 gap-16 w-11/12'>
        {requests.slice(0).reverse().map((request) => <EmployeeRequest key={request._id} {...request} handleStatusUpdate={handleStatusUpdate}/>)}
      </Stack>
    </Box>
  );
}