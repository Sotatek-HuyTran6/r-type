import { API } from 'redux/api-route';
import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { userDetailFailure, userDetailLoading, userDetailSuccess } from './reducers';

export const getuserDetail = (_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userDetailLoading());
    const res: any = await AxiosUtils.get(`${API.userDetail}/${_id}`);
    dispatch(userDetailSuccess(res?.data));
  } catch (err) {
    dispatch(userDetailFailure(err));
  }
};
