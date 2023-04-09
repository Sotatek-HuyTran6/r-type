/* eslint-disable react/display-name */
import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { FormControl, InputLabel, FormHelperText, Input, Typography } from '@mui/material';
import { IValidator } from 'utils/validate';

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

const CustomFormInput = forwardRef(
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
        <Input
          name={name}
          value={value}
          type={type}
          onChange={handleInputOnChange}
          id={`${preId}_${name}`}
          sx={{
            color: 'white',
            '&::hover': { borderColor: 'white' },
            '&::before': { borderColor: 'white' },
          }}
          color='secondary'
        ></Input>
        <FormHelperText id='my-helper-text'>{err}</FormHelperText>
      </FormControl>
    );
  },
);

export default CustomFormInput;
