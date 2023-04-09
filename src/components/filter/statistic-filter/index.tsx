import React, { useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { statisticOption } from 'utils/options';

const StatisticFilter = ({
  handleChange,
  value,
}: {
  value?: 14 | 30 | 90;
  handleChange: (payload: { title: string; value: 14 | 30 | 90 }) => void;
}) => {
  const handleSelectChange = (e: any) => {
    const { value } = e.target;
    const findObj = statisticOption.filter((item) => item.value === value);
    handleChange(findObj[0]);
  };
  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '24px' }}>
      <Select
        sx={{
          width: '160px',
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
        value={value}
        name='statisticOption'
        onChange={handleSelectChange}
        disableInjectingGlobalStyles
      >
        {statisticOption.map((item, index) => {
          return (
            <MenuItem
              value={item.value}
              sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              key={index}
            >
              <BeenhereIcon sx={{ fontSize: '1.4rem' }} /> {item.title}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default StatisticFilter;
