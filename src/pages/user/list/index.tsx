import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'types/redux';
import { useDispatch } from 'react-redux';
import { getUserList } from 'redux/user/user-list/actions';
import CutomizedTable from './../../../components/table';
import { CustomTableColumn } from 'types/common';
import { Typography, Avatar, Box, Button } from '@mui/material';
import { setParamUserList, setDataUserList } from 'redux/user/user-list/reducers';
import PopupDetail from 'components/popup-detail';
import SearchInput from 'components/search-input';
import { editUser } from 'redux/user/edit-user/actions';
import _ from 'lodash';

function UserList() {
  const dispatch = useDispatch() as AppDispatch;
  const userList = useSelector((state: RootState) => state.userList);
  const { data, error, loading, total, paramsData } = userList;

  const pagination = {
    current: paramsData.page,
    pageSize: paramsData.size,
    total: total,
    onChange: (current: number, size: number) => {
      dispatch(setParamUserList({ ...paramsData, page: current, size: size }));
    },
  };

  const onSearchChange = (value: string) => {
    dispatch(setParamUserList({ ...paramsData, searchPhrase: value }));
  };

  const onDelete = () => {
    console.log('this');
  };

  const handleViewDetail = (record: any) => {
    console.log(record);
  };

  const handleBanUser = async (userId: string | number) => {
    dispatch(editUser(userId)).then((status) => {
      if (status) {
        const cloneData = [...data];
        const index = _.findIndex(data, (item: any) => item.userId === userId);
        cloneData[index] = {
          ...cloneData[index],
          banned: !cloneData[index].banned,
        };
        dispatch(setDataUserList([...cloneData]));
      }
    });
  };

  const columns: CustomTableColumn[] = [
    {
      title: 'Avatar',
      align: 'center',
      key: 'image',
      width: 52,
      render: (image: string, record: any) => {
        return (
          <Box style={{ width: 40, height: 40 }}>
            <Avatar
              alt={`${record.firstName} ${record.lastName}`}
              src={image}
              sx={{ width: 40, height: 40, margin: '0px' }}
            />
          </Box>
        );
      },
    },
    {
      title: 'Email',
      align: 'left',
      key: 'email',
      width: 50,
      render: (title: string) => {
        return <div>{title}</div>;
      },
    },
    {
      title: 'First name',
      align: 'left',
      key: 'firstName',
      width: 70,
      render: (title: string) => {
        return <div>{title}</div>;
      },
    },
    {
      title: 'Last name',
      align: 'left',
      key: 'lastName',
      width: 70,
      render: (title: string) => {
        return <div>{title}</div>;
      },
    },
    {
      title: 'Gender',
      align: 'left',
      key: 'gender',
      width: 70,
      render: (title: string) => {
        return <div>{title}</div>;
      },
    },
    {
      title: 'Status',
      align: 'left',
      key: 'userId',
      width: 70,
      render: (userId: string | number, record: any) => {
        return (
          <div style={{ display: 'flex' }}>
            <Button
              color={record.banned ? 'primary' : 'secondary'}
              sx={{ textTransform: 'capitalize' }}
              onClick={() => handleBanUser(userId)}
            >
              {record.banned ? 'banned' : 'active'}
            </Button>
          </div>
        );
      },
    },
    {
      title: 'Role',
      align: 'left',
      key: 'role',
      width: 70,
      render: (title: string) => {
        return <div>{title}</div>;
      },
    },
    {
      title: 'View detail',
      align: 'left',
      width: 70,
      render: (_: any, record: any) => {
        return (
          <div>
            <PopupDetail title='User detail'>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: '460px' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: '600', width: '120px' }}>First name:</Typography>
                    <Typography>{record.firstName}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: '600', width: '120px' }}>Last name:</Typography>
                    <Typography>{record.lastName}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: '600', width: '120px' }}>Gender:</Typography>
                    <Typography>{record.gender}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: '600', width: '120px' }}>Banned:</Typography>
                    <Typography>{record.banned ? 'True' : 'False'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: '600', width: '120px' }}>Birth date:</Typography>
                    <Typography>{record.birthDate}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: '600', width: '120px' }}>Title:</Typography>
                    <Typography>{record.title}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: '600', width: '120px' }}>user ID:</Typography>
                    <Typography>{record.userId}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: '600', width: '120px' }}>Email:</Typography>
                    <Typography>{record.email}</Typography>
                  </Box>
                </Box>
                <Box sx={{ width: '460px' }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Typography sx={{ fontWeight: '600', width: '120px' }}>Intro:</Typography>
                    <Typography sx={{ width: '340px' }}>{record.intro}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: '600', width: '120px' }}>
                      Phone number:
                    </Typography>
                    <Typography>{record.phoneNumber}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: '600', width: '120px' }}>Register at:</Typography>
                    <Typography>{record.registerAt}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: '600', width: '120px' }}>Role:</Typography>
                    <Typography>{record.role}</Typography>
                  </Box>
                </Box>
              </Box>
            </PopupDetail>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getUserList(paramsData));
  }, [dispatch, paramsData]);

  useEffect(() => {
    return () => {
      dispatch(setParamUserList(null));
      dispatch(setDataUserList([]));
    };
  }, []);

  return (
    <div className='category-list'>
      <Typography variant='h4' sx={{ marginBottom: '72px', color: '#bd93f9', fontWeight: '500' }}>
        User List
      </Typography>
      <div>
        <SearchInput onSearchChange={onSearchChange}></SearchInput>
      </div>
      <div>
        <CutomizedTable rows={data} columns={columns} pagination={pagination}></CutomizedTable>
      </div>
    </div>
  );
}

export default UserList;
