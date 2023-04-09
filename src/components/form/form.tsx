import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import React, { ReactElement, useRef } from 'react';

interface Props {
  children: ReactElement | ReactElement[];
  submitForm: any;
  initialState: any;
  style?: any;
  name: string;
  setForm: any;
  submitStyle?: any;
  submitStyleButton?: any;
}

function CustomForm({
  children,
  submitForm,
  initialState,
  style,
  name,
  setForm,
  submitStyle,
  submitStyleButton,
}: Props) {
  const ref = useRef<any>([]);

  const verifySubmit = () => {
    let isOk = true;
    Array.isArray(ref.current) &&
      ref.current.forEach((item: any, index) => {
        if (Array.isArray(item)) {
          item.every((subItem) => {
            isOk = subItem.verifyAgain() ? isOk : false;
          });
        } else {
          isOk = item.verifyAgain() ? isOk : false;
        }
      });
    return isOk;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (verifySubmit()) {
      submitForm(e);
    }
  };

  const handleChange = (valueChange: any) => {
    setForm({
      ...initialState,
      ...valueChange,
    });
  };

  const render = () => {
    let i = 0;
    const arrayRender = Array.isArray(children) ? children : [children];
    return arrayRender.map((item, index) => {
      if (item.type === 'div') {
        const insideDivArray = Array.isArray(item.props?.children)
          ? item.props?.children
          : [item.props?.children];
        return (
          <div key={index} style={item.props?.style}>
            {insideDivArray.map((subItem: any, subIndex: number) => {
              const refer = (i: any) => {
                return (el: any) => (ref.current[i] = el);
              };
              const element = React.cloneElement(subItem, {
                // item includes name, label, type, rules, style
                key: subIndex,
                value: initialState[subItem.props?.name],
                onChange: handleChange,
                preId: name,
                ...subItem.props,
                ref: refer(i),
              });
              i++;
              return element;
            })}
          </div>
        );
      } else {
        const refer = (i: any) => {
          return (el: any) => (ref.current[i] = el);
        };
        const element = React.cloneElement(item, {
          // item includes name, label, type, rules, style
          key: index,
          value: initialState[item.props?.name],
          onChange: handleChange,
          preId: name,
          ...item.props,
          ref: refer(i),
        });
        i++;
        return element;
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ ...style, display: 'flex', flexDirection: 'column', gap: '16px' }}
      id={name}
    >
      {render()}
      <FormControl sx={{ ...submitStyle }}>
        <Button
          variant='contained'
          type='submit'
          color='neutral'
          sx={{ textTransform: 'none', width: '100px', margin: '16px 0', ...submitStyleButton }}
        >
          save
        </Button>
      </FormControl>
    </form>
  );
}

export default CustomForm;
