import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';

export default function ChangePassword() {
  const [openAlert , setOpenAlert] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [currentPasswordError, setCurrentPasswordError] = useState<string>('');
  const [newPasswordError, setNewPasswordError] = useState<string>('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState<string>('');


  const resetErrorMessages = () => {
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmNewPasswordError('');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetErrorMessages();
    if(currentPassword === '') {
      setCurrentPasswordError('Fill out current password');
    }
    else if(newPassword === '') {
      setNewPasswordError('Fill out new password');
    }
    else if(newPassword.length < 8) {
      setNewPasswordError('Password must be at least 8 characters');
    }
    else if(newPassword !== confirmNewPassword) {
      setConfirmNewPassword('Passwords do not match');
    }
    else {
      resetErrorMessages();
      //store need password in DB and if currentpassword matches
      setOpenAlert(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  }

  return (
    <Box className='flex flex-col items-center p-16 gap-10'>
      <Typography>Change Password Page</Typography>
      <Box component='form' onSubmit={handleSubmit} className='flex flex-row justify-center w-full gap-4'>
        <Box className='w-4/5'>
          <Box className='flex flex-col gap-4'>
            <TextField value={currentPassword}
                    error={currentPasswordError !== ''}
                    helperText={currentPasswordError}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    id='currentPassword'
                    type='password'
                    label='Current Password'
                    fullWidth/>
            <TextField value={newPassword}
                    error={newPasswordError !== ''}
                    helperText={newPasswordError}
                    onChange={(e) => setNewPassword(e.target.value)}
                    id='newPassword'
                    type='password'
                    label='Password'
                    fullWidth/>
            <TextField value={confirmNewPassword}
                    error={confirmNewPasswordError !== ''}
                    helperText={confirmNewPasswordError}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    id='confirmNewPassword'
                    type='password'
                    label='Confirm Password'
                    fullWidth/>
            <Button variant='contained' type='submit' color='primary'>Change Password</Button>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={openAlert}
              autoHideDuration={3000}
              onClose={() => setOpenAlert(false)}
              message='Password Changed'
             >
              <Alert severity='success'
                  variant='filled'
                  sx={{ width: '100%' }}>
                  Password Changed!
                </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}