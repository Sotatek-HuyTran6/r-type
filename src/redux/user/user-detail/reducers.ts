import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    _id: '',
    name: '',
  },
  loading: false,
  error: '',
};

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: initialState,
  reducers: {
    userDetailLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    userDetailSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    userDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetuserDetail: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
  },
});

export const { userDetailFailure, userDetailLoading, userDetailSuccess, resetuserDetail } =
  userDetailSlice.actions;

export default userDetailSlice.reducer;
