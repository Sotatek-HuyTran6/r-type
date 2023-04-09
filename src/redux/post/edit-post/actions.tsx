import React from 'react';
import { toast } from 'react-toastify';
import { API } from 'redux/api-route';
import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { editPostSuccess, editPostFailure, editPostLoading } from './reducers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const editPost =
  (id: string | number, data: { visible: boolean }) => async (dispatch: AppDispatch) => {
    try {
      dispatch(editPostLoading());
      const res: any = await AxiosUtils.put(API.editPost + `/${id}`, { ...data });
      dispatch(editPostSuccess(res.data));
      toast.success('Update post status sucessfull!', {
        icon: () => {
          return <CheckCircleIcon sx={{ color: 'rgb(0, 209, 101)' }} />;
        },
      });
      return true;
    } catch (err) {
      dispatch(editPostFailure(err));
      toast.success('Update post status failed!', {
        icon: () => {
          return <CheckCircleIcon sx={{ color: '#e74c3c' }} />;
        },
      });
      return false;
    }
  };
