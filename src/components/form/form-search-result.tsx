/* eslint-disable react/display-name */
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { TextField, Box, IconButton, Typography, LinearProgress, Fade } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import _ from 'lodash';
import { useCheckClickOutside } from 'hooks/useCheckClickOutside';
import { IValidator } from 'utils/validate';

interface Props {
  style?: any;
  value?: any;
  rules?: ((value: any) => IValidator)[];
  name: string;
  searchText?: string;
  onSearchChange?: any;
  searchResult?: any;
  nameToShow: string;
  onChange?: any;
  label?: any;
}
// mac dinh la _id nhe

const CustomFormSearchResult = forwardRef(
  (
    { name, value, rules, onSearchChange, searchResult, nameToShow, onChange, label }: Props,
    ref: any,
  ) => {
    const [err, setErr] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<any>([]);
    const [textSearch, setTextSearch] = useState<string>('');
    const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const showResultRef = useRef<any>(null);
    const isMountRef = useRef(true);

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

    useCheckClickOutside(() => {
      setShowSearchResult(false);
    }, showResultRef);

    const onDeleteSelectedItem = (index: number) => {
      if (index > -1) {
        const array = Array(...selectedItems);
        array.splice(index, 1);
        setSelectedItems(array);
      }
    };

    const handleTextSearchChange = (e: any) => {
      const { value } = e.target;
      setTextSearch(value);
    };

    const debounceLoadData = useCallback(
      _.debounce((text) => {
        if (text.length >= 3) {
          onSearchChange(text);
        }
      }, 1000),
      [],
    );

    useEffect(() => {
      setIsloading(false);
    }, [searchResult]);

    useEffect(() => {
      checkShowSearchResult();
      setIsloading(textSearch.length >= 3 ? true : false);
      debounceLoadData(textSearch);
    }, [textSearch]);

    useEffect(() => {
      onChange({
        [name]: selectedItems,
      });
      !isMountRef.current && validate(selectedItems);
    }, [selectedItems]);

    useEffect(() => {
      isMountRef.current = false;
    }, []);

    const checkShowSearchResult = () => {
      setShowSearchResult(textSearch.length >= 3 ? true : false);
    };

    const handleSelectItem = (item: any) => {
      setSelectedItems([...selectedItems, item]);
    };

    const handleRemoveItem = (item: any) => {
      const newArray = selectedItems.filter((x: any) => {
        return x._id !== item._id;
      });
      setSelectedItems(newArray);
    };

    useImperativeHandle(ref, () => ({
      verifyAgain() {
        return validate(value);
      },
    }));

    const renderSearchResult = () => {
      return (
        <Box
          sx={{
            position: 'absolute',
            top: '36px',
            left: '0',
            backgroundColor: 'white',
            borderRadius: '4px',
            zIndex: '9999999999',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            width: '500px',
            minHeight: '100px',
          }}
        >
          {isLoading ? (
            <div>
              <LinearProgress sx={{ borderRadius: '6px' }} />
            </div>
          ) : (
            <Box sx={{ padding: '8px 12px' }}>
              {searchResult.map((item: any, index: number) => {
                const selectedItem = selectedItems.find((x: any) => x._id === item._id);
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
                    <Typography sx={{ fontSize: '.85rem' }}>{item[nameToShow]}</Typography>
                    {selectedItem ? (
                      <DoneIcon sx={{ fontSize: '.85rem', color: '#1a8cff' }}></DoneIcon>
                    ) : (
                      ''
                    )}
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      );
    };

    return (
      <Box>
        <Typography>{label}</Typography>
        <Box
          sx={{
            border: err ? '1px solid red' : '1px solid #e6e6e6',
            padding: '16px',
            borderRadius: '6px',
            transition: 'all .3s ease-in-out',
          }}
        >
          <Box sx={{ position: 'relative', width: '200px' }} ref={showResultRef}>
            <TextField
              placeholder='Search'
              variant='standard'
              name='textSearch'
              value={textSearch}
              onChange={handleTextSearchChange}
              onClick={() => {
                checkShowSearchResult();
              }}
            />
            <Fade in={showSearchResult}>{renderSearchResult()}</Fade>
          </Box>
          <Box
            sx={{
              marginTop: '16px',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {selectedItems.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  component='span'
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #bfbfbf',
                    position: 'relative',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#e6e6e6',
                  }}
                >
                  <Typography sx={{ fontSize: '.8rem' }}>{item[nameToShow]}</Typography>
                  <IconButton
                    sx={{
                      top: 0,
                      right: 0,
                      zIndex: 999999,
                      padding: 0,
                      '&:hover': {
                        backgroundColor: '#cccccc',
                      },
                    }}
                    onClick={() => onDeleteSelectedItem(index)}
                  >
                    <ClearIcon sx={{ fontSize: '1.1rem' }} />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
          <Typography
            sx={{
              color: 'red',
              fontSize: '.8rem',
            }}
          >
            {err}
          </Typography>
        </Box>
      </Box>
    );
  },
);

export default CustomFormSearchResult;
