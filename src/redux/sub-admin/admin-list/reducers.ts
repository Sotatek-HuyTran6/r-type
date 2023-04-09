import { createSlice } from '@reduxjs/toolkit';

interface IAdminList {
  data: any;
  loading: boolean;
  error: string;
  total: number;
  paramsData: {
    page: number;
    size: number;
    email: string;
    role: number;
  };
}

const initialState: IAdminList = {
  data: [],
  loading: false,
  error: '',
  total: 0,
  paramsData: {
    page: 0,
    size: 5,
    email: '',
    role: 2,
  },
};

const getAdminSlice = createSlice({
  name: 'getAdminList',
  initialState: initialState,
  reducers: {
    getAdminLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    getAdminSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload.users;
      state.total = action.payload.totalPage;
    },
    getAdminFailure: (state, action) => {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    },
    setParamAdminList: (state, action) => {
      state.paramsData = action.payload
        ? { ...state.paramsData, ...action.payload }
        : initialState.paramsData;
    },
    setDataAdminList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  getAdminLoading,
  getAdminSuccess,
  getAdminFailure,
  setDataAdminList,
  setParamAdminList,
} = getAdminSlice.actions;

export default getAdminSlice.reducer;
