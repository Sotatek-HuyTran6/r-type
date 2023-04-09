/* eslint-disable react/display-name */
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, FormHelperText } from '@mui/material';
import _ from 'lodash';
import { IValidator } from 'utils/validate';
import Typography from '@mui/material/Typography';

// default
// [{
//   title: string,
//   id: string,
// }]

interface Props {
  style?: any;
  value?: any;
  rules?: ((value: any) => IValidator)[];
  name: string;
  onChange?: any;
  label?: any;
  menuItems: any;
}

const CustomFormSelect = forwardRef(
  ({ name, value, rules, onChange, label, menuItems, style }: Props, ref: any) => {
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

    useImperativeHandle(ref, () => ({
      verifyAgain() {
        return validate(value);
      },
    }));

    const handleChange = (e: any) => {
      const { value, name } = e.target;
      onChange({
        [name]: value,
      });
    };

    return (
      <Box>
        <FormControl style={{ ...style, minWidth: 100 }}>
          <Typography>{label}</Typography>
          <Select
            name={name}
            value={value ? value : ''}
            onChange={handleChange}
            error={err ? true : false}
            disableInjectingGlobalStyles
            sx={{
              color: 'white',
            }}
          >
            {menuItems.map((item: any, index: number) => {
              return (
                <MenuItem key={index} value={item.title}>
                  {item.title}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText style={{ color: '#d32f2f' }} id='my-helper-text'>
            {err}
          </FormHelperText>
        </FormControl>
      </Box>
    );
  },
);

export default CustomFormSelect;
