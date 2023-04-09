import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: '',
};

const createAdminSlice = createSlice({
  name: 'createAdmin',
  initialState: initialState,
  reducers: {
    createAdminLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    createAdminSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
    createAdminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetcreateAdminError: (state) => {
      state.error = '';
    },
  },
});

export const { createAdminLoading, createAdminFailure, createAdminSuccess, resetcreateAdminError } =
  createAdminSlice.actions;

export default createAdminSlice.reducer;
