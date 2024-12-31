import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Alert, Snackbar } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { registerEmployee } from '../../api/api';

export default function CreateAccount() {
  const [openAlert , setOpenAlert] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [salary, setSalary] = useState<number>(0);
  const [status, setStatus] = useState<string>('Active');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [NameError, setNameError] = useState<string>('');
  const [EmailError, setEmailError] = useState<string>('');
  const [PasswordError, setPasswordError] = useState<string>('');
  const [ConfirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [PhoneNumberError, setPhoneNumberError] = useState<string>('');
  const [DepartmentError, setDepartmentError] = useState<string>('');
  const [PositionError, setPositionError] = useState<string>('');
  const [SalaryError, setSalaryError] = useState<string>('');

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(Number(e.target.value) >= 0) {
      setSalary(Number(e.target.value));
    }
  };

  const resetErrorMessages = () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setPhoneNumberError('');
    setDepartmentError('');
    setPositionError('');
    setSalaryError('');
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  const validPhoneNumber = (phoneNumber: string) => {
    const re = /^\d\d\d-\d\d\d-\d\d\d$/;
    return re.test(phoneNumber);
  }

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrorMessages();
    if(name === '') {
      setNameError('Fill out name');
    }
    else if(email === '') {
      setEmailError('Fill out email');
    }
    else if(password === '') {
      setPasswordError('Fill out password');
    }
    else if(confirmPassword === '') {
      setConfirmPasswordError('Fill out confirm password');
    }
    else if(phoneNumber === '') {
      setPhoneNumberError('Fill out phone number');
    }
    else if(department === '') {
      setDepartmentError('Fill out department');
    }
    else if(position === '') {
      setPositionError('Fill out position');
    }
    else if(salary === 0) {
      setSalaryError('Fill out salary');
    }
    else if (!validateEmail(email)) {
      setEmailError('Invalid Email');
    }
    else if(password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    }
    else if(password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    }
    else if(!validPhoneNumber(phoneNumber)) {
      setPhoneNumberError('Follow the format ###-###-### for phone number');
    }
    else if(salary < 0) {
      setSalaryError('Salary must be greater than 0');
    }
    else {
      resetErrorMessages();
      //store employee in DB and create account
      const createEmployee  = await registerEmployee({_id: uuidv4(), name, email, password, phoneNumber, department, position, startDate, salary, status, isAdmin});
      if(createEmployee.message === 'Employee registered successfully'){
        setOpenAlert(true);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhoneNumber('');
        setDepartment('');
        setPosition('');
        setStartDate(dayjs());
        setSalary(0);
        setIsAdmin(false);
      }
      else{
        if(createEmployee.response.data.message === 'Account with this email already exists'){
          setEmailError('An employee with this email already exists');
        }
        else{
          setEmailError(createEmployee.response.data.message);
        }
      }

    }
  }


  return (
    <Box className='flex flex-col items-center p-16 gap-10'>
      <Typography>Create Account Page</Typography>
      <Box component='form' onSubmit={handelSubmit} className='flex flex-col gap-4 w-full'>
        <TextField value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    label='Name'
                    error={NameError !== ''}
                    helperText={NameError} />
        <TextField value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    label='Email'
                    error={EmailError !== ''}
                    helperText={EmailError} />
        <TextField value={password}
                    type='password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    label='Password'
                    error={PasswordError !== ''}
                    helperText={PasswordError} />
        <TextField value={confirmPassword}
                    required
                    type='password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label='Confirm Password'
                    error={ConfirmPasswordError !== ''}
                    helperText={ConfirmPasswordError} />
        <TextField value={phoneNumber}
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    label='Phone Number'
                    error={PhoneNumberError !== ''}
                    helperText={PhoneNumberError} />
         <TextField value={department}
                    required
                    onChange={(e) => setDepartment(e.target.value)}
                    label='Department'
                    error={DepartmentError !== ''}
                    helperText={DepartmentError} />
        <TextField value={position}
                    required
                    onChange={(e) => setPosition(e.target.value)}
                    label='Position'
                    error={PositionError !== ''}
                    helperText={PositionError} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            required
            label='Date Hired'
            value={startDate}
            onChange={(newValue) => {if(newValue==null){setStartDate(dayjs())} else{setStartDate(newValue)}}}/>
        </LocalizationProvider>
        <TextField value={salary}
                    required
                    onChange={handleSalaryChange}
                    label='Salary'
                    error={SalaryError !== ''}
                    helperText={SalaryError} />
        <FormControl fullWidth>
          <InputLabel id='status-label'>Status</InputLabel>
          <Select labelId='status-label' label='Status' value={status} onChange={(e) => setStatus(e.target.value)} id='status-select'>
            <MenuItem value='Active'>Active</MenuItem>
            <MenuItem value='Inactive'>Inactive</MenuItem>
            <MenuItem value='Terminated'>Terminated</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel control={<Checkbox />} label='Does this user have admin permissions' value={isAdmin} onChange={() => setIsAdmin(!isAdmin)}/>
        <Button type='submit' variant='contained'>Create Account</Button>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={openAlert}
                  autoHideDuration={3000}
                  onClose={() => setOpenAlert(false)}
                  message='Create Account and Register Employee'>
          <Alert severity='success'
                variant='filled'
                sx={{ width: '100%' }}>
                Employee Registered and Account Created!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}