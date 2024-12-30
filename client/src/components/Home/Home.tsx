import { useContext, useState } from 'react';
import { MessageType } from '../../types/types';
import { List } from './GlobalMessages';
import Message from '../Message/Message';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {UserContext } from '../../Context/UserContext';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import ConfirmationAlert from '../ConfirmationAlert/ConfirmationAlert';



export default function Home() {
  const [messages, setMessages] = useState<MessageType[]>(List);
  const [title, setTitle] = useState<string>('');
  const [messageBody, setMessageBody] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');
  const {user} = useContext(UserContext);

  const resetErrorMessages = () => {
    setTitleError('');
    setMessageError('');
  }


  const handleSend = () => {
    resetErrorMessages();
    if(messageBody === '') {
      setMessageError('Fill out message');
    }
    else if(title === '') {
      setTitleError('Fill out title');
    }
    else if(title.length > 60) {
      setTitleError('Title must be less than 60 characters');
    }
    else if(messageBody.length > 1000) {
      setMessageError('Message must be less than 1000 characters');
    }
    else{
      resetErrorMessages();
      const message: MessageType = {
        title: title,
        name: user.name,
        message: messageBody,
        date: dayjs()
      };
      setMessages([...messages, message]);
      setTitle('');
      setMessageBody('');
    }
  }

  return (
    <Box className='flex flex-col items-center'>
      <Box className='flex flex-row w-full p-4 gap-4'>
        <Typography>Welcome, {user.name}</Typography>
      </Box>
      <Box component='form' className='flex flex-row justify-center w-full p-16 gap-4'>
        <Box className='w-4/5'>
          <Box className='flex flex-col gap-4'>
            <TextField value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    size='small'
                    id='title'
                    label='Title'
                    error={titleError !== ''}
                    helperText={titleError}
                    fullWidth/>
            <TextField value={messageBody}
                    required
                    onChange={(e) => setMessageBody(e.target.value)}
                    id='message'
                    label='Message'
                    error={messageError !== ''}
                    helperText={messageError}
                    fullWidth
                    multiline
                    maxRows={4}/>
          </Box>
        </Box>
        <Box>
          <ConfirmationAlert
            title='Are you sure you want to send this message?'
            description='This message will be sent to all employees. This should only be used for important work related messages.'
            response={handleSend}>
            {(showDialog) => (
              <Button onClick={showDialog} aria-label='send message' variant='outlined'>Send</Button>)}
          </ConfirmationAlert>
        </Box>
      </Box>
      <Typography variant='h5' className='text-center'>Company Message Board</Typography>
      <Stack className='gap-4 p-6'>
        {messages.slice(0).reverse().map((message, index) => (
          <Message key={index} {...message} expand={index < 1}/>))
        }
      </Stack>
    </Box>
  );
}