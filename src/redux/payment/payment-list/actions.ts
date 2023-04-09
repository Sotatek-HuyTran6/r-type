import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { API } from 'redux/api-route';
import { getPaymentFailure, getPaymentLoading, getPaymentSuccess } from './reducers';
import { IParamPaymentList } from 'types/payment';

export const getPaymentList = (params: IParamPaymentList) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getPaymentLoading());
    const res: any = await AxiosUtils.get(API.paymentList, params);
    dispatch(getPaymentSuccess(res.data));
  } catch (err) {
    dispatch(getPaymentFailure(err));
  }
};
