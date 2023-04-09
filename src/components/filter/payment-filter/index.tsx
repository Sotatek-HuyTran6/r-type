import React from 'react';
import { MenuItem, Select } from '@mui/material';
import MouseIcon from '@mui/icons-material/Mouse';
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import PendingIcon from '@mui/icons-material/Pending';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import AllOutIcon from '@mui/icons-material/AllOut';

const PaymentFilter = ({
  type,
  paymentState,
  onChange,
}: {
  type: '1' | '2';
  paymentState: 'done' | 'pending' | 'all';
  onChange: (payload: any) => void;
}) => {
  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    onChange({
      [name]: value === 'all' ? '' : value,
    });
  };

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '24px' }}>
      <Select
        sx={{
          width: '124px',
          '.MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px !important',
            borderColor: 'white !important',
            padding: '8px',
          },
          '.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white !important',
            padding: '8px',
          },
          '.MuiOutlinedInput-input': {
            padding: '8px',
          },
          color: 'white',
          '.MuiSelect-icon': {
            color: 'white',
          },
        }}
        value={type}
        name='type'
        onChange={handleSelectChange}
        disableInjectingGlobalStyles
      >
        <MenuItem value='1' sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MouseIcon sx={{ fontSize: '1.4rem' }} /> Manual
        </MenuItem>
        <MenuItem value='2' sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MotionPhotosAutoIcon sx={{ fontSize: '1.4rem' }} /> Auto
        </MenuItem>
      </Select>
      <Select
        sx={{
          width: '124px',
          '.MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px !important',
            borderColor: 'white !important',
            padding: '8px',
          },
          '.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white !important',
            padding: '8px',
          },
          '.MuiOutlinedInput-input': {
            padding: '8px',
          },
          color: 'white',
          '.MuiSelect-icon': {
            color: 'white',
          },
        }}
        value={paymentState}
        name='paymentState'
        onChange={handleSelectChange}
        disableInjectingGlobalStyles
      >
        <MenuItem value='done' sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BeenhereIcon sx={{ fontSize: '1.4rem' }} /> done
        </MenuItem>
        <MenuItem value='pending' sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PendingIcon sx={{ fontSize: '1.4rem' }} /> pending
        </MenuItem>
        <MenuItem value='all' sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AllOutIcon sx={{ fontSize: '1.4rem', height: '1.4rem' }} /> all
        </MenuItem>
      </Select>
    </div>
  );
};

export default PaymentFilter;
