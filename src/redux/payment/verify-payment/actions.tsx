import React from 'react';
import { toast } from 'react-toastify';
import { API } from 'redux/api-route';
import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { verifyPaymentFailure, verifyPaymentLoading, verifyPaymentSuccess } from './reducers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface VerifyPaymentPayload {
  paymentId: string | number;
  state: 'done';
}

export const verifyPayment = (data: VerifyPaymentPayload) => async (dispatch: AppDispatch) => {
  try {
    dispatch(verifyPaymentLoading());
    const res: any = await AxiosUtils.post(API.verifyPayment, data);
    dispatch(verifyPaymentSuccess(res.data));
    toast.success('Verify payment sucessfull!', {
      icon: () => {
        return <CheckCircleIcon sx={{ color: 'rgb(0, 209, 101)' }} />;
      },
    });
    return true;
  } catch (err) {
    dispatch(verifyPaymentFailure(err));
    toast.success('Verify payment failed!', {
      icon: () => {
        return <CheckCircleIcon sx={{ color: '#e74c3c' }} />;
      },
    });
    return false;
  }
};
