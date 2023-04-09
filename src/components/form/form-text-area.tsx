/* eslint-disable react/display-name */
import React, { useImperativeHandle, useState, forwardRef, useEffect } from 'react';
import { FormControl, Typography, FormHelperText, TextField } from '@mui/material';
import { IValidator } from 'utils/validate';

interface Props {
  rules?: ((value: any) => IValidator)[];
  style?: any;
  name: string;
  value?: any;
  onChange?: any;
  type?: string;
  preId?: string;
  rows?: number;
  maxRows?: number;
  label?: string;
}

const CustomFormTextArea = forwardRef(
  ({ rules, style, name, value, onChange, type, preId, rows, label }: Props, ref: any) => {
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

    const handleInputOnChange = (e: any) => {
      const { name, value } = e.target;
      onChange({
        [name]: value,
      });
      validate(value);
    };

    useImperativeHandle(ref, () => ({
      verifyAgain() {
        return validate(value);
      },
    }));

    return (
      <FormControl error={err ? true : false} style={style}>
        <Typography style={{ color: '#8be9fd' }}>{label}</Typography>
        <TextField
          name={name}
          value={value ? value : ''}
          type={type}
          onChange={handleInputOnChange}
          id={`${preId}_${name}`}
          rows={rows}
          multiline
          error={err ? true : false}
          color='secondary'
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '8px',
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
            textarea: {
              color: 'white',
            },
          }}
        ></TextField>
        <FormHelperText id='my-helper-text'>{err}</FormHelperText>
      </FormControl>
    );
  },
);

export default CustomFormTextArea;
