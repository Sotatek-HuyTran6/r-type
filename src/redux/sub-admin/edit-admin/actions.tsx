import React from 'react';
import { toast } from 'react-toastify';
import { API } from 'redux/api-route';
import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { editAdminFailure, editAdminLoading, editAdminSuccess } from './reducers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const editAdmin = (id: string | number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(editAdminLoading());
    const res: any = await AxiosUtils._delete(API.banUser + `/${id}`);
    dispatch(editAdminSuccess(res.data));
    toast.success('Update user status sucessfull!', {
      icon: () => {
        return <CheckCircleIcon sx={{ color: 'rgb(0, 209, 101)' }} />;
      },
    });
    return true;
  } catch (err) {
    dispatch(editAdminFailure(err));
    toast.success('Update user status failed!', {
      icon: () => {
        return <CheckCircleIcon sx={{ color: '#e74c3c' }} />;
      },
    });
    return false;
  }
};
