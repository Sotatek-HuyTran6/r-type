import React, { ReactElement } from 'react';
import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Box,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
  children: ReactElement;
  title: string;
}

function PopupDetail({ children, title }: Props) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleOpen} sx={{ textTransform: 'none' }}>
        Detail
      </Button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        sx={{ padding: '64px 64px 0px 64px', zIndex: '99999999999' }}
        maxWidth='xl'
      >
        <DialogTitle id='alert-dialog-title' sx={{ padding: '20px 16px 24px 24px' }}>
          {title}
        </DialogTitle>
        <DialogContent sx={{ padding: '0px 64px 24px 64px' }}>{children}</DialogContent>
        <DialogActions sx={{ padding: '0px 20px 20px 40px' }}>
          <Button onClick={handleConfirm} autoFocus color='warning' sx={{ textTransform: 'none' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopupDetail;
