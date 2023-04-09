import { createSlice } from '@reduxjs/toolkit';

interface IUserList {
  data: any;
  loading: boolean;
  error: string;
  total: number;
  paramsData: {
    page: number;
    size: number;
    searchPhrase: string;
  };
}

const initialState: IUserList = {
  data: [],
  loading: false,
  error: '',
  total: 0,
  paramsData: {
    page: 0,
    size: 5,
    searchPhrase: '',
  },
};

const getUserSlice = createSlice({
  name: 'getUserList',
  initialState: initialState,
  reducers: {
    getUserLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload.users;
      state.total = action.payload.totalPage;
    },
    getUserFailure: (state, action) => {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    },
    setParamUserList: (state, action) => {
      state.paramsData = action.payload
        ? { ...state.paramsData, ...action.payload }
        : initialState.paramsData;
    },
    setDataUserList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getUserLoading, getUserSuccess, getUserFailure, setDataUserList, setParamUserList } =
  getUserSlice.actions;

export default getUserSlice.reducer;
