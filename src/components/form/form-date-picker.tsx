/* eslint-disable react/display-name */
import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { FormControl, FormHelperText, Typography, TextField } from '@mui/material';
import { IValidator } from 'utils/validate';
import { DatePicker } from '@mui/x-date-pickers';

interface Props {
  rules?: ((value: any) => IValidator)[];
  style?: any;
  name: string;
  value: any;
  onChange?: any;
  type?: string;
  preId?: string;
  label?: string;
}

const CustomFormDatePicker = forwardRef(
  ({ rules, style, name, value, onChange, type, preId, label }: Props, ref: any) => {
    const [err, setErr] = useState<string>('');

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

    const handleInputOnChange = (v: any) => {
      onChange({
        [name]: v,
      });
      validate(v);
    };

    useImperativeHandle(ref, () => ({
      verifyAgain() {
        return validate(value);
      },
    }));

    return (
      <FormControl error={err ? true : false} style={style}>
        <Typography style={{ color: '#8be9fd' }}>{label}</Typography>
        <DatePicker
          onChange={handleInputOnChange}
          value={value}
          format='DD/MM/YYYY'
          sx={{
            input: {
              color: 'white',
              padding: '8px',
            },
            button: {
              color: 'white',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#9c27b0',
              },
            },
          }}
        />
        <FormHelperText id='my-helper-text'>{err}</FormHelperText>
      </FormControl>
    );
  },
);

export default CustomFormDatePicker;
