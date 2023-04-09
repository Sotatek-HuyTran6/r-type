import { API } from 'redux/api-route';
import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { adminDetailFailure, adminDetailLoading, adminDetailSuccess } from './reducers';

export const getAdminDetail = (_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(adminDetailLoading());
    const res: any = await AxiosUtils.get(`${API.adminDetail}/${_id}`);
    dispatch(adminDetailSuccess(res?.data));
  } catch (err) {
    dispatch(adminDetailFailure(err));
  }
};
