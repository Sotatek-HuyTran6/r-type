import { NavigateFunction } from 'react-router-dom';
import { API } from 'redux/api-route';
import { paths } from 'routes/routes';
import { Category } from 'types/category';
import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { editCategoryFailure, editCategoryLoading, editCategorySuccess } from './reducers';

export const editCategory =
  (data: Category, id: string | number, navigate: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(editCategoryLoading());
      const res: any = await AxiosUtils.put(API.editCategory + `/${id}`, data);
      dispatch(editCategorySuccess(res.data));
      navigate(paths.categoryList);
    } catch (err) {
      dispatch(editCategoryFailure(err));
    }
  };
