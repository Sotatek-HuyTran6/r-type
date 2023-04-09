import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { API } from 'redux/api-route';
import { getAdminFailure, getAdminLoading, getAdminSuccess } from './reducers';
import { AdminListParams } from 'types/admin';

export const getAdminList = (params: AdminListParams) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getAdminLoading());
    const res: any = await AxiosUtils.get(API.adminList, params);
    dispatch(getAdminSuccess(res.data));
  } catch (err) {
    dispatch(getAdminFailure(err));
  }
};
