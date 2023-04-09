import { createSlice } from '@reduxjs/toolkit';
import { PostListParams } from 'types/post';

interface IPostList {
  data: any;
  loading: boolean;
  error: string;
  total: number;
  paramsData: {
    queryFor: 'map' | 'normal';
    queryType: 'all';
    pageNumber: number;
    pageSize: number;
    houseType?: 1 | 2 | 3 | 4 | 5;
    houseCategory?: 1 | 2;
    showInvisible: boolean;
  };
}

const initialState: IPostList = {
  data: [],
  loading: false,
  error: '',
  total: 0,
  paramsData: {
    pageNumber: 0,
    pageSize: 5,
    queryFor: 'normal',
    queryType: 'all',
    showInvisible: true,
  },
};

const getPostListSlice = createSlice({
  name: 'getPostList',
  initialState: initialState,
  reducers: {
    getPostLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    getPostSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload.houses;
      state.total = action.payload.totalPage;
    },
    getPostFailure: (state, action) => {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    },
    setParamPostList: (state, action) => {
      state.paramsData = action.payload
        ? { ...state.paramsData, ...action.payload }
        : initialState.paramsData;
    },
    setDataPostList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getPostLoading, getPostSuccess, getPostFailure, setDataPostList, setParamPostList } =
  getPostListSlice.actions;

export default getPostListSlice.reducer;
