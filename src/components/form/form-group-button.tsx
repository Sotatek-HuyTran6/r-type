/* eslint-disable react/display-name */
import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { FormControl, ButtonGroup, Button, FormHelperText, Typography } from '@mui/material';
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
  buttonItems: {
    value: string | number;
    label: string;
  }[];
}

const CustomFormGroupButton = forwardRef(
  ({ rules, style, name, value, onChange, type, preId, label, buttonItems }: Props, ref: any) => {
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

    const handleInputOnChange = (v: string | number) => {
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
        <ButtonGroup disableElevation variant='outlined' color='info'>
          {buttonItems.map((item: any, index: number) => {
            return (
              <Button
                key={index}
                onClick={() => handleInputOnChange(item.value)}
                color={'secondary'}
                variant={`${item.value === value ? 'contained' : 'outlined'}`}
                sx={{ textTransform: 'none' }}
              >
                <Typography sx={{ color: `${item.value === value ? 'secondary' : 'white'}` }}>
                  {item.label}
                </Typography>
              </Button>
            );
          })}
        </ButtonGroup>
        <FormHelperText id='my-helper-text'>{err}</FormHelperText>
      </FormControl>
    );
  },
);

export default CustomFormGroupButton;
