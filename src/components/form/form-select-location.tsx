/* eslint-disable react/display-name */
import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { Box, FormControl, TextField, Typography, Input } from '@mui/material';
import { IValidator } from 'utils/validate';
import GoogleMap from 'components/google-map/google-map';
import { MapPosition } from 'types/common';
import PlacesAutocomplete from 'components/google-map/auto-complete';

interface Props {
  rules?: ((value: any) => IValidator)[];
  style?: any;
  name: string;
  value?: any;
  onChange?: any;
  type?: string;
  preId?: string;
  label?: string;
}

const CustomFormSelectLocation = forwardRef(
  ({ rules, style, name, value, onChange, type, preId, label }: Props, ref: any) => {
    const [err, setErr] = useState<string>('');
    const [position, setPosition] = useState<MapPosition>({});

    const validate = (inputValue: any) => {
      let isOk = true;
      Array.isArray(rules) &&
        rules.every((validate) => {
          const { error, message } = validate(inputValue);
          if (error) {
            isOk = false;
            setErr(message);
            return false;
          } else {
            setErr('');
            return true;
          }
        });
      return isOk;
    };

    useImperativeHandle(ref, () => ({
      verifyAgain() {
        return validate(value);
      },
    }));

    const handlePositionOnChange = (e: any) => {
      const { name, value } = e.target;
      setPosition({
        ...position,
        [name]: parseInt(value),
      });
    };

    const handleChangePosition = (position: MapPosition) => {
      setPosition(position);
    };

    const handleChangePlace = (pos: MapPosition) => {
      setPosition(pos);
    };

    return (
      <Box style={style}>
        <Typography>{label}</Typography>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              zIndex: '999999',
              top: '8px',
              left: '8px',
              width: '390px',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'white',
                padding: '8px 0px',
                borderRadius: '6px',
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              }}
            >
              <PlacesAutocomplete handleChangePlace={handleChangePlace} />
            </Box>
            <Box
              sx={{
                backgroundColor: 'white',
                padding: '8px 32px',
                borderRadius: '6px',
                marginTop: '16px',
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              }}
            >
              <Box sx={{ display: 'flex', marginTop: '24px', gap: '24px' }}>
                <Box>
                  <Typography sx={{ fontSize: '.8rem' }}>latitude</Typography>
                  <Input
                    value={position.lat ? position.lat : ''}
                    onChange={handlePositionOnChange}
                    sx={{ fontSize: '.8rem' }}
                    type='number'
                    name='lat'
                  ></Input>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '.8rem' }}>longtitude</Typography>
                  <Input
                    value={position.long ? position.long : ''}
                    onChange={handlePositionOnChange}
                    sx={{ fontSize: '.8rem' }}
                    type='number'
                    name='long'
                  ></Input>
                </Box>
              </Box>
            </Box>
          </Box>
          <GoogleMap position={position} handleChangePosition={handleChangePosition}></GoogleMap>
        </Box>
      </Box>
    );
  },
);

export default CustomFormSelectLocation;
