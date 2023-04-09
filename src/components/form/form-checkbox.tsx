/* eslint-disable react/display-name */
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { FormControl, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import { IValidator } from 'utils/validate';
import Typography from '@mui/material/Typography';
import { Select } from 'types/form';

interface Props {
  rules?: ((value: any) => IValidator)[];
  style?: any;
  onChange?: any;
  type?: string;
  preId?: string;
  label?: string;
  selects: Select[];
}

const CustomFormCheckBox = forwardRef(
  ({ rules, style, onChange, type, preId, label, selects }: Props, ref: any) => {
    const [err, setErr] = useState<string>('');

    const validate = (selects: Select[]) => {
      let isOk = true;
      Array.isArray(rules) &&
        rules.every((validate) => {
          const { error, message } = validate(selects);
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

    const handleOnChange = (e: any) => {
      const { name, checked } = e.target;
      onChange({
        [name]: checked,
      });
      validate(selects.map((item) => (item.name === name ? { ...item, value: checked } : item)));
    };

    useImperativeHandle(ref, () => ({
      verifyAgain() {
        return validate(selects);
      },
    }));

    return (
      <FormControl style={style} error={err ? true : false}>
        <Typography style={{ color: err ? 'red' : 'black' }}>{label}</Typography>
        {selects.map((item, index) => {
          return (
            <FormControlLabel
              key={index}
              label={item.label}
              name={item.name}
              checked={item.value}
              control={<Checkbox onChange={handleOnChange}></Checkbox>}
            ></FormControlLabel>
          );
        })}
        <FormHelperText id='my-helper-text'>{err}</FormHelperText>
      </FormControl>
    );
  },
);

export default CustomFormCheckBox;
