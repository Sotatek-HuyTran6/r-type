import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { API } from 'redux/api-route';
import { getPostSuccess, getPostFailure, getPostLoading } from './reducers';
import { PostListParams } from 'types/post';

export const getPostList = (params: PostListParams) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getPostLoading());
    const res: any = await AxiosUtils.get(API.post, params);
    dispatch(getPostSuccess(res.data));
  } catch (err) {
    dispatch(getPostFailure(err));
  }
};
