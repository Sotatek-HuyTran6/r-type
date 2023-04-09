import React, { useEffect } from 'react';
import { Button, Box, Collapse, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './style.scss';
import { Link, useLocation } from 'react-router-dom';
import { MenuItem } from 'types/common';

interface Props {
  data: MenuItem;
  index: number;
}

function CollapseButton({ data, index }: Props) {
  const [isChecked, setIsChecked] = React.useState(false);
  const Icon = data.icon;
  const currentPath = useLocation().pathname;

  useEffect(() => {
    let check = false;
    data.children?.map((item: any, index: number) => {
      if (item.path === currentPath) {
        check = true;
      }
    });
    setIsChecked(check);
  }, [currentPath]);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='collapse-item'>
      <Button
        sx={{
          textTransform: 'none',
          color: '#f8f8f2',
          justifyContent: 'flex-start',
          width: '100%',
        }}
        variant='text'
        onClick={handleChange}
        startIcon={<Icon sx={{ color: '#f8f8f2' }} />}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {data.label}
          <ChevronRightIcon
            sx={{
              color: '#f8f8f2',
              transform: `rotate(${isChecked ? '90deg' : '0deg'})`,
              transition: 'all .2s ease-in-out',
            }}
          />
        </Box>
      </Button>
      <div className='collapse-content'>
        <Collapse in={isChecked ? true : false}>
          {data?.children?.map((item: any, index: number) => {
            const SubIcon = item.icon;
            return (
              <Link
                key={index}
                to={item.path}
                style={{ textDecoration: 'none', marginLeft: '24px' }}
              >
                <Button
                  startIcon={item.icon ? <SubIcon /> : null}
                  sx={{
                    color: currentPath === item.path ? '#50fa7b' : '#ff79c6',
                    fontSize: '.875rem',
                    justifyContent: 'flex-start',
                    width: '100%',
                    textTransform: 'none',
                  }}
                >
                  <Typography sx={{ fontSize: '0.875rem' }}>{item.label}</Typography>
                </Button>
              </Link>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
}

export default CollapseButton;
