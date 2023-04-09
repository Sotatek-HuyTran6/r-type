import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { TextField, Box } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';

interface Props {
  handleChangePlace: any;
}

function PlacesAutocomplete({ handleChangePlace }: Props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'cb',
    requestOptions: {},
    debounce: 1000,
  });

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: any }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results: any) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log('📍 Coordinates: ', { lat, lng });
        handleChangePlace({ lat: lat, long: lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion: any) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <Box
          sx={{
            '&:hover': {
              cursor: 'pointer',
              backgroundColor: '#f2f2f2',
            },
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            paddingLeft: '8px',
          }}
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <Box sx={{ fontSize: '2rem' }}>
            <RoomIcon sx={{ color: '#a6a6a6' }} />
          </Box>
          <div style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <span style={{ color: '#333333' }}>{main_text}</span>&nbsp;
            <span style={{ color: '#333333' }}>{secondary_text}</span>
          </div>
        </Box>
      );
    });

  return (
    <Box>
      <TextField
        variant='standard'
        placeholder='Search'
        sx={{ marginLeft: '32px' }}
        InputProps={{
          disableUnderline: true,
          style: {
            padding: '2px 4px',
            fontSize: '.9rem',
            outline: 'none',
            border: 'none',
          },
        }}
        value={value}
        onChange={handleInput}
        disabled={!ready}
      ></TextField>
      {status === 'OK' && <Box>{renderSuggestions()}</Box>}
    </Box>
  );
}

export default PlacesAutocomplete;
