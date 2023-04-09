import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'types/redux';
import { useDispatch } from 'react-redux';
import CutomizedTable from './../../../components/table';
import { CustomTableColumn } from 'types/common';
import { Typography, Avatar, Box, Button } from '@mui/material';
import { setParamAdminList, setDataAdminList } from 'redux/sub-admin/admin-list/reducers';
import _ from 'lodash';
import { setDataPostList, setParamPostList } from 'redux/post/post-list/reducers';
import { getPostList } from 'redux/post/post-list/actions';
import moment from 'moment';
import { editPost } from 'redux/post/edit-post/actions';

function PostList() {
  const dispatch = useDispatch() as AppDispatch;
  const postList = useSelector((state: RootState) => state.postList);
  const { data, error, loading, total, paramsData } = postList;

  const pagination = {
    current: paramsData.pageNumber,
    pageSize: paramsData.pageSize,
    total: total,
    onChange: (current: number, size: number) => {
      dispatch(setParamPostList({ ...paramsData, pageNumber: current, pageSize: size }));
    },
  };

  const handleToggleVisible = async (postId: string | number, isVisible: boolean) => {
    dispatch(editPost(postId, { visible: isVisible })).then((status) => {
      if (status) {
        const cloneData = [...data];
        const index = _.findIndex(data, (item: any) => item.houseId === postId);
        if (index !== -1) {
          cloneData[index] = {
            ...cloneData[index],
            isVisible: !cloneData[index].isVisible,
          };
          dispatch(setDataPostList([...cloneData]));
        }
      }
    });
  };

  const columns: CustomTableColumn[] = [
    {
      title: 'Thumbnail',
      align: 'center',
      key: 'thumbnail',
      width: 52,
      render: (image: string, record: any) => {
        return (
          <Box style={{ width: 40, height: 40 }}>
            <Avatar
              alt={`${record.firstName} ${record.lastName}`}
              src={image}
              sx={{ width: 40, height: 40, margin: '0px', borderRadius: '4px' }}
            />
          </Box>
        );
      },
    },
    {
      title: 'Price (VND)',
      align: 'left',
      key: 'price',
      width: 50,
      render: (title: string) => {
        return <div>{title}</div>;
      },
    },
    {
      title: 'Address',
      align: 'left',
      key: 'address',
      width: 70,
      render: (title: string) => {
        return <div>{title}</div>;
      },
    },
    {
      title: 'Created Date',
      align: 'left',
      key: 'createdDate',
      width: 70,
      render: (title: string) => {
        return <div>{moment(title).format('DD/MM/YYYY')}</div>;
      },
    },
    {
      title: 'Status',
      align: 'left',
      key: 'houseId',
      width: 70,
      render: (postId: string | number, record: any) => {
        return (
          <div style={{ display: 'flex' }}>
            <Button
              color={record.isVisible ? 'secondary' : 'primary'}
              sx={{ textTransform: 'capitalize' }}
              onClick={() => handleToggleVisible(postId, !record.isVisible)}
            >
              {record.isVisible ? 'visible' : 'hidden'}
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getPostList(paramsData));
  }, [dispatch, paramsData]);

  useEffect(() => {
    return () => {
      dispatch(setParamAdminList(null));
      dispatch(setDataAdminList([]));
    };
  }, []);

  return (
    <div className='category-list'>
      <Typography variant='h4' sx={{ marginBottom: '72px', color: '#bd93f9', fontWeight: '500' }}>
        Post List
      </Typography>
      <div>{/* <SearchInput onSearchChange={onSearchChange}></SearchInput> */}</div>
      <div>
        <CutomizedTable rows={data} columns={columns} pagination={pagination}></CutomizedTable>
      </div>
    </div>
  );
}

export default PostList;
