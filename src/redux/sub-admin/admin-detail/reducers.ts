import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    _id: '',
    name: '',
  },
  loading: false,
  error: '',
};

const adminDetailSlice = createSlice({
  name: 'adminDetail',
  initialState: initialState,
  reducers: {
    adminDetailLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    adminDetailSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    adminDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetAdminDetail: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
  },
});

export const { adminDetailFailure, adminDetailLoading, adminDetailSuccess, resetAdminDetail } =
  adminDetailSlice.actions;

export default adminDetailSlice.reducer;
