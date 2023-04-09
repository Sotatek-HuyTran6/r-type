import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: '',
};

const createUserSlice = createSlice({
  name: 'createUser',
  initialState: initialState,
  reducers: {
    createUserLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetCreateUserError: (state) => {
      state.error = '';
    },
  },
});

export const { createUserLoading, createUserFailure, createUserSuccess, resetCreateUserError } =
  createUserSlice.actions;

export default createUserSlice.reducer;
