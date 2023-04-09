import { API } from 'redux/api-route';
import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { categoryDetailFailure, categoryDetailLoading, categoryDetailSuccess } from './reducers';

export const getCategoryDetail = (_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(categoryDetailLoading());
    const res: any = await AxiosUtils.get(`${API.categoryDetail}/${_id}`);
    dispatch(categoryDetailSuccess(res?.data));
  } catch (err) {
    dispatch(categoryDetailFailure(err));
  }
};
