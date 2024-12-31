import { useContext, useEffect, useState } from 'react';
import { MessageType } from '../../types/types';
import Message from '../Message/Message';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {UserContext } from '../../Context/UserContext';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import ConfirmationAlert from '../ConfirmationAlert/ConfirmationAlert';
import { v4 as uuidv4 } from 'uuid';
import {getAllEmployeeMessages, createEmployeeMessage} from '../../api/api';

export default function Home() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [title, setTitle] = useState<string>('');
  const [messageBody, setMessageBody] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');
  const {user} = useContext(UserContext);

  const resetErrorMessages = () => {
    setTitleError('');
    setMessageError('');
  }

  useEffect(() => {
    const fetchMessages = async() => {
      const allMessages = await getAllEmployeeMessages();
      if(allMessages.message === 'Messages fetched successfully') {
        allMessages.messages.forEach((message: MessageType) => {
          message.date = dayjs(message.date);
        });
        setMessages(allMessages.messages);
      }
      else{
        console.log('Error fetching messages');
      }
    }
    fetchMessages();
  }, []);

  const handleSend = async() => {
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
        _id: uuidv4(),
        email: user.email,
        title: title,
        name: user.name,
        message: messageBody,
        date: dayjs()
      };
      const createMessage = await createEmployeeMessage(message);
      if(createMessage.message === 'Message created successfully') {
        setMessages([...messages, message]);
        setMessageBody('');
        setTitle('');
      }
      else{
        setMessageError('Error sending message');
      }
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
      <Stack className='gap-4 p-6 w-11/12'>
        {messages.slice(0).reverse().map((message, index) => (
          <Message key={message._id} {...message} expand={index < 1}/>))
        }
      </Stack>
    </Box>
  );
}