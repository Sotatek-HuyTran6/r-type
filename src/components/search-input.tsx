import React from 'react';
import { Box, Input } from '@mui/material';
import _ from 'lodash';

interface Props {
  onSearchChange: (value: string) => void;
}

const SearchInput = ({ onSearchChange }: Props) => {
  const debounceSearch = _.debounce((text) => {
    onSearchChange(text);
  }, 1500);

  const handleOnChange = (e: any) => {
    debounceSearch(e.target.value);
  };

  return (
    <Box sx={{ marginBottom: '20px', width: '100%' }}>
      <Input
        placeholder='Search'
        onChange={handleOnChange}
        sx={{
          width: '40%',
          color: 'white',
          '&::hover': { borderColor: 'white' },
          '&::before': { borderColor: 'white' },
          input: {
            color: 'white',
          },
          '&::placeholder': {
            color: 'white',
          },
        }}
        color='secondary'
      />
    </Box>
  );
};

export default SearchInput;
