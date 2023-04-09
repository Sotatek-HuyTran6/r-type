import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { API } from 'redux/api-route';
import { CategoryListParams } from 'types/category';
import { getUserFailure, getUserLoading, getUserSuccess } from './reducers';

export const getUserList = (params: CategoryListParams) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getUserLoading());
    const res: any = await AxiosUtils.get(API.userList, params);
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure(err));
  }
};
