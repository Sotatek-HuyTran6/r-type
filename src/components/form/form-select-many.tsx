/* eslint-disable react/display-name */
import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { Box, IconButton, Typography, Fade, FormControl } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import _ from 'lodash';
import { useCheckClickOutside } from 'hooks/useCheckClickOutside';
import { IValidator } from 'utils/validate';

interface Props {
  value?: any;
  style?: any;
  rules?: ((value: any) => IValidator)[];
  name: string;
  onChange?: any;
  label?: any;
  menuItems: any;
}
// mac dinh la id nhe

const CustomFormSelectMany = forwardRef(
  ({ name, value, rules, onChange, style, label, menuItems }: Props, ref: any) => {
    const [selectedItems, setSelectedItems] = useState<any>([]);
    const [showMenuItems, setShowMenuItems] = useState<boolean>(false);
    const showMenuItemsRef = useRef(null);

    useCheckClickOutside(() => {
      setShowMenuItems(false);
    }, showMenuItemsRef);

    const handleSelectItem = (item: any) => {
      setSelectedItems([...selectedItems, item]);
    };

    const handleRemoveItem = (item: any) => {
      const newArray = selectedItems.filter((x: any) => {
        return x.id !== item.id;
      });
      setSelectedItems(newArray);
    };

    useEffect(() => {
      onChange({
        [name]: selectedItems,
      });
    }, [selectedItems]);

    const renderMenuItems = () => {
      return (
        <Box
          sx={{
            position: 'absolute',
            top: '102%',
            left: '0',
            backgroundColor: 'white',
            borderRadius: '4px',
            zIndex: '9999999999',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            width: '500px',
            minHeight: '100px',
          }}
        >
          <Box sx={{ padding: '8px 12px' }}>
            {menuItems.map((item: any, index: number) => {
              const selectedItem = selectedItems.find((x: any) => x.id === item.id);
              return (
                <Box
                  key={index}
                  sx={{
                    boxSizing: 'border-box',
                    width: '100%',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    transition: 'all .3s ease-in-out',
                    color: 'black',
                    textTransform: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: selectedItem ? '#e6f3ff' : 'white',
                    '&:hover': {
                      cursor: 'pointer',
                      backgroundColor: selectedItem ? '#e6f3ff' : '#f2f2f2',
                    },
                  }}
                  onClick={() => {
                    if (selectedItem) {
                      handleRemoveItem(item);
                    } else {
                      handleSelectItem(item);
                    }
                  }}
                >
                  <Typography sx={{ fontSize: '.85rem' }}>{item.title}</Typography>
                  {selectedItem ? (
                    <DoneIcon sx={{ fontSize: '.85rem', color: '#1a8cff' }}></DoneIcon>
                  ) : (
                    ''
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    };

    const checkShowMenuItem = () => {
      setShowMenuItems(true);
    };

    const onDeleteSelectedItem = (index: number) => {
      if (index > -1) {
        const array = Array(...selectedItems);
        array.splice(index, 1);
        setSelectedItems(array);
      }
    };

    return (
      <FormControl fullWidth style={{ ...style, minWidth: 100 }}>
        <Typography>{label}</Typography>
        <Box
          sx={{
            minHeight: '40px',
            width: '100%',
            border: '1px solid #dadada',
            '&:hover': {
              cursor: 'pointer',
            },
            position: 'relative',
            borderRadius: '6px',
          }}
          onClick={() => {
            checkShowMenuItem();
          }}
          ref={showMenuItemsRef}
        >
          <Fade in={showMenuItems}>{renderMenuItems()}</Fade>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '4px',
              padding: '8px',
            }}
          >
            {selectedItems.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  component='span'
                  style={{
                    padding: '4px 16px',
                    border: '1px solid #bfbfbf',
                    position: 'relative',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#f2f2f2',
                  }}
                >
                  <Typography sx={{ fontSize: '.8rem' }}>{item.title}</Typography>
                  <IconButton
                    sx={{
                      top: '-.5px',
                      right: 0,
                      zIndex: 999999,
                      padding: 0,
                      '&:hover': {
                        backgroundColor: '#cccccc',
                      },
                      color: '#808080',
                    }}
                    onClick={() => onDeleteSelectedItem(index)}
                  >
                    <ClearIcon sx={{ fontSize: '.95rem' }} />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
        </Box>
      </FormControl>
    );
  },
);

export default CustomFormSelectMany;
