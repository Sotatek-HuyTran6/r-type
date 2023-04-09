import React from 'react';
import { Box, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './style.scss';
import { StorageKey, StorageUtils } from 'utils/session';

function Header() {
  const handleLogOut = () => {
    StorageUtils.remove(StorageKey.SESSION);
    window.location.reload();
  };

  return (
    <Box
      className='header'
      sx={{
        width: '100vw',
        height: '60px',
        backgroundColor: '#191b28',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        borderBottom: '1px solid',
        borderColor: '#44475a',
        zIndex: 999,
      }}
    >
      <div className='app-icon'></div>
      <div className='function'>
        <IconButton style={{ color: 'white' }} onClick={handleLogOut}>
          <LogoutIcon />
        </IconButton>
      </div>
    </Box>
  );
}

export default Header;
