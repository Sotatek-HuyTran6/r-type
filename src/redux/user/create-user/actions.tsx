import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { API } from 'redux/api-route';
import { paths } from 'routes/routes';
import { AppDispatch } from 'types/redux';
import { toast } from 'react-toastify';
import AxiosUtils from 'utils/axios-utils';
import { createUserFailure, createUserLoading, createUserSuccess } from './reducers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const createUser =
  (data: any, navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    try {
      dispatch(createUserLoading());
      const res: any = await AxiosUtils.post(API.createUser, data);
      dispatch(createUserSuccess(res?.data?.data));
      navigate(paths.categoryList);
      toast.success('this', {
        icon: () => {
          return <CheckCircleIcon />;
        },
      });
    } catch (err) {
      dispatch(createUserFailure(err));
      toast('Create category failed!', {
        icon: `<div>this</div>`,
      });
    }
  };
