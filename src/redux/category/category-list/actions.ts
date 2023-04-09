import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { API } from 'redux/api-route';
import { CategoryListParams } from 'types/category';
import { getCategoryFailure, getCategoryLoading, getCategorySuccess } from './reducers';

export const getCategoryList = (params: CategoryListParams) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getCategoryLoading());
    const res: any = await AxiosUtils.get(API.categoryList, params);
    dispatch(getCategorySuccess(res.data));
  } catch (err) {
    dispatch(getCategoryFailure(err));
  }
};
