import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CollapseButton from './collapseButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useSelector } from 'react-redux';
import { RootState } from 'types/redux';
import { MenuItem } from 'types/common';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PostAddIcon from '@mui/icons-material/PostAdd';

const menuItems: MenuItem[] = [
  {
    label: 'Home',
    path: '/',
    icon: AccessTimeIcon,
    children: [
      {
        label: 'Dashboard',
        path: '/',
      },
    ],
  },
  {
    label: 'user',
    path: '/user',
    icon: AccountCircleIcon,
    children: [
      {
        label: 'user list',
        path: '/user',
        id: 'user/list',
        icon: ViewListIcon,
      },
    ],
  },
  {
    subadminDisable: true,
    label: 'sub admin',
    path: '/sub-admin',
    icon: AdminPanelSettingsIcon,
    children: [
      {
        label: 'sub admin list',
        path: '/sub-admin',
        id: 'sub-admin/list',
        icon: ViewListIcon,
      },
      {
        label: 'create sub admin',
        path: '/sub-admin/create',
        id: 'sub-admin/create',
        icon: AddCircleIcon,
      },
    ],
  },
  {
    label: 'payment',
    path: '/payment',
    icon: AdminPanelSettingsIcon,
    children: [
      {
        label: 'payment list',
        path: '/payment',
        id: 'payment/list',
        icon: ViewListIcon,
      },
    ],
  },
  {
    label: 'post',
    path: '/post',
    icon: PostAddIcon,
    children: [
      {
        label: 'post list',
        path: '/post',
        id: 'post/list',
        icon: ViewListIcon,
      },
    ],
  },
];

function Menu() {
  const auth: any = useSelector((state: RootState) => state.auth);
  const { data, error, myInfo, isLoading } = auth;

  return (
    <Box
      className='menu'
      sx={{
        height: '100vh',
        width: '300px',
        backgroundColor: '#191b28',
        position: 'fixed',
        top: '0',
        left: '0',
        borderBottom: '2px solid',
        borderColor: '#44475a',
        zIndex: '999999999',
        padding: '0px 16px',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '24px 8px',
          }}
        >
          <div>
            <Avatar
              alt={`${myInfo?.firstName} ${myInfo?.lastName}`}
              src={myInfo?.image}
              sx={{ width: 44, height: 44, margin: '0px' }}
            />
          </div>
          <div className='title'>
            <Typography sx={{ color: 'primary.light', fontWeight: '500' }}>
              {myInfo?.email}
            </Typography>
            <Typography sx={{ color: 'primary.light', fontWeight: '700' }}>
              {myInfo?.firstName} {myInfo?.lastName}
            </Typography>
          </div>
        </Box>

        <div className='menu-list'>
          {menuItems.map((item: MenuItem, index: number) => {
            if (myInfo?.role === 'sub_admin' && item.subadminDisable) {
              return null;
            } else {
              return <CollapseButton data={item} index={index} key={index}></CollapseButton>;
            }
          })}
        </div>

        <div className='intro'>
          <div className='app-icon'>
            <img src='/images/web-logo.png'></img>
          </div>
          <div>
            <span
              style={{
                color: 'white',
                fontWeight: '900',
                fontSize: '2.4rem',
                letterSpacing: '2px',
              }}
            >
              Zee
            </span>
            <span
              style={{
                color: 'white',
                fontSize: '2.4rem',
              }}
            >
              Home
            </span>
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default Menu;
