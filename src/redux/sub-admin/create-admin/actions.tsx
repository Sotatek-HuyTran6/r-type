import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { API } from 'redux/api-route';
import { paths } from 'routes/routes';
import { AppDispatch } from 'types/redux';
import { toast } from 'react-toastify';
import AxiosUtils from 'utils/axios-utils';
import { createAdminFailure, createAdminLoading, createAdminSuccess } from './reducers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const createAdmin =
  (data: any, navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    try {
      dispatch(createAdminLoading());
      const res: any = await AxiosUtils.post(API.createAdmin, data);
      dispatch(createAdminSuccess(res?.data?.data));
      navigate(paths.adminList);
      toast.success('Create admin successful!', {
        icon: () => {
          return <CheckCircleIcon sx={{ color: 'rgb(0, 209, 101)' }} />;
        },
      });
    } catch (err) {
      dispatch(createAdminFailure(err));
      toast('Create admin failed!', {
        icon: <CheckCircleIcon sx={{ color: '#e74c3c' }} />,
      });
    }
  };
