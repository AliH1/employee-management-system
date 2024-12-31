import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RequestType } from '../../types/types';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {UserContext } from '../../Context/UserContext';
import { useContext, useState } from 'react';
import FormLabel from '@mui/material/FormLabel';

interface EmployeeRequestProps extends RequestType {
  handleStatusUpdate?: (_id: string, status: string) => void;
}

export default function EmployeeRequest({ _id, name, email, message, reason, date, status, handleStatusUpdate} : EmployeeRequestProps) {
  const {user} = useContext(UserContext);
  const [myStatus, setMyStatus] = useState<string>(status);
  const myColor = status === 'Pending' ? 'lightblue' : status === 'Approved' ? 'green' : 'red';
  const [color, setColor] = useState<string>(myColor);

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    setMyStatus(e.target.value)
    if(e.target.value === 'Pending')
      setColor('lightblue');
    if(e.target.value === 'Approved')
      setColor('green');
    if(e.target.value === 'Rejected')
      setColor('red');
    if(handleStatusUpdate !== undefined && user.isAdmin){
      handleStatusUpdate(_id, e.target.value);
    }
  }

  return (
    <div className='w-full border border-white rounded-sm'>
      <Box className='flex flex-col items-center p-4 gap-4'>
        {user.isAdmin ?
        <FormControl fullWidth>
          <InputLabel id='status-label'>Status</InputLabel>
          <Select size='small' sx={{color: {color}}} labelId='status-label' label='Status' value={myStatus} onChange={handleStatusChange} id='status-select'>
            <MenuItem value='Pending'>Pending</MenuItem>
            <MenuItem value='Approved'>Approved</MenuItem>
            <MenuItem value='Rejected'>Rejected</MenuItem>
          </Select>
        </FormControl> :
        <div className='flex flex-row gap-2'>
          <FormLabel sx={{fontWeight: 'bold'}}>Status:</FormLabel>
          <FormLabel sx={{color: {color}, fontWeight: 'bold'}}>{myStatus}</FormLabel>
        </div>
        }
        <Accordion className='w-full'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <Typography component='span' sx={{ width: '30%', flexShrink: 0, fontWeight: 'bold' }}>
              {reason}
            </Typography>
            <Typography component='span' sx={{ width: '50%', flexShrink: 0, color: 'text.secondary' }}>
              {name} ({email})
            </Typography>
            <Typography component='span' sx={{color: 'text.secondary'}}>
              {date.format('lll')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {message}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
}
