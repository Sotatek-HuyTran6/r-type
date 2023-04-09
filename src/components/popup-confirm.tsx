import React, { ReactElement } from 'react';
import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
  children: ReactElement;
  onConfirm: any;
}

function PopupConfirm({ onConfirm, children }: Props) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <div>
      <IconButton color='warning' onClick={handleOpen}>
        <DeleteForeverIcon />
      </IconButton>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle id='alert-dialog-title'>{'Cofirm dialog'}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} autoFocus color='warning' sx={{ textTransform: 'none' }}>
            Yes
          </Button>
          <Button onClick={handleClose} color='warning' sx={{ textTransform: 'none' }}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopupConfirm;
