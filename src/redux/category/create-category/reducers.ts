import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: '',
};

const createCateogrySlice = createSlice({
  name: 'createCategory',
  initialState: initialState,
  reducers: {
    createCategoryLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    createCategorySuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
    createCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetCreateCategoryError: (state) => {
      state.error = '';
    },
  },
});

export const {
  createCategoryLoading,
  createCategoryFailure,
  createCategorySuccess,
  resetCreateCategoryError,
} = createCateogrySlice.actions;

export default createCateogrySlice.reducer;
