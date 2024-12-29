import { useContext, useState } from 'react';
import { RequestType } from '../../types/types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {UserContext } from '../../Context/UserContext';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import ConfirmationAlert from '../ConfirmationAlert/ConfirmationAlert';
import EmployeeRequest from '../EmployeeRequest/EmoloyeeRequest';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

export default function SendRequest() {
    const [requests, setRequests] = useState<RequestType[]>([]);
    const [reason, setReason] = useState<string>('Update Info');
    const [message, setMessage] = useState<string>('');
    const {user} = useContext(UserContext);
    const [messageError, setMessageError] = useState<string>('');

  // useEffect to fetch list of Requests with current email
  const handleSend = () => {
    if(message === '') {
      setMessageError('Message is required');
      return;
    }

    const newRequest = {
      id: requests.length + 1, //remove id when connected to backend
      name: user.name,
      email: user.email,
      status: 'Pending',
      message: message,
      reason: reason,
      date: dayjs().format('MM/DD/YYYY')
    }
    //add to backend DB and fetch requests instead of set
    setRequests([...requests, newRequest]);
    setMessage('');
    setReason('');
  }

  return (
    <Box className='flex flex-col items-center'>
      <Box component='form' className='flex flex-row justify-center w-full p-16 gap-4'>
        <Box className='w-4/5'>
          <Box className='flex flex-col gap-4'>
            <FormControl fullWidth>
              <InputLabel id='reason-label'>Reason</InputLabel>
              <Select required  labelId='reason-label' label='Reason' onChange={(e) => setReason(e.target.value)} value={reason} id='reason-select'>
                <MenuItem value='Update Info'>Update Info</MenuItem>
                <MenuItem value='Request Time off'>Request Time off</MenuItem>
                <MenuItem value='Terminate Contract'>Terminate Contract</MenuItem>
                <MenuItem value='Temporary Leave'>Temporary Leave</MenuItem>
                <MenuItem value='Other'>Other</MenuItem>
              </Select>
            </FormControl>
            <TextField value={message}
                    error={messageError !== ''}
                    helperText={messageError}
                    required
                    onChange={(e) => setMessage(e.target.value)}
                    id='message'
                    label='Message'
                    fullWidth
                    multiline
                    maxRows={4}/>
          </Box>
        </Box>
        <Box>
          <ConfirmationAlert
            title='Are you sure you want to send this request?'
            description='This request will be sent to an Admin for review. This can not be undone. Are you sure you want to send'
            response={handleSend}>
            {(showDialog) => (
              <Button onClick={showDialog} aria-label='send message' variant='outlined'>Send</Button>)}
          </ConfirmationAlert>
        </Box>
      </Box>
      <Typography variant='h5' className='text-center'>Your Requests</Typography>
      <Stack className='p-4 gap-16 w-4/5'>
        {requests.slice(0).reverse().map((request) => (
          <EmployeeRequest key={request.id} {...request}/>))
        }
      </Stack>
    </Box>
  )
}