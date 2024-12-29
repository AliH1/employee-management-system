import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

//credit to https://dev.to/akshaysrepo/building-a-confirmation-dialog-component-with-react-and-material-ui-4468

type confirmationAlertProps = {
  children: (showDialog: () => void) => JSX.Element;
  title: string;
  description: string;
  response: () => void;
};

function confirmationAlert({ children, title, description, response }: confirmationAlertProps) {
  //local states
  const [open, setOpen] = useState(false);

  const showDialog = () => {
    setOpen(true);
  };

  const hideDialog = () => {
    setOpen(false);
  };

  const confirmRequest = () => {
    response();
    hideDialog();
  };

  return (
    <>
      {children(showDialog)}
      {open && (
        <Dialog
          open={open}
          onClose={hideDialog}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={confirmRequest} color='primary'>
              Yes
            </Button>
            <Button onClick={hideDialog} color='primary'>
              No
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default confirmationAlert;

