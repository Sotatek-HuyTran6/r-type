import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    _id: '',
    name: '',
  },
  loading: false,
  error: '',
};

const categoryDetailSlice = createSlice({
  name: 'categoryDetail',
  initialState: initialState,
  reducers: {
    categoryDetailLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    categoryDetailSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    categoryDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetCategoryDetail: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
  },
});

export const {
  categoryDetailFailure,
  categoryDetailLoading,
  categoryDetailSuccess,
  resetCategoryDetail,
} = categoryDetailSlice.actions;

export default categoryDetailSlice.reducer;
