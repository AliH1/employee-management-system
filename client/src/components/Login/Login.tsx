import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <Box className='bg-background absolute inset-0 h-screen'>
      <Box component='form' onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-10 p-4 mt-16'>
        <Typography variant='h5' className='font-bold text-white'>Login Page</Typography>
        <Box className='w-4/5'>
          <Box className='flex flex-col gap-4'>
            <TextField
                    required
                    type='email'
                    id='email'
                    label='Email'
                    fullWidth/>
            <TextField
                    type='password'
                    required
                    id='password'
                    label='Password'
                    fullWidth/>
            <Button variant='contained' type='submit' color='primary'>Login</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}