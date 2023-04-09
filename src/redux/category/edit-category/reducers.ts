import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: '',
};

const editCategorySlice = createSlice({
  name: 'editCategory',
  initialState: initialState,
  reducers: {
    editCategoryLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    editCategorySuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
    editCategoryFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetEditCategoryError: (state) => {
      state.loading = false;
      state.error = '';
    },
  },
});

export const {
  editCategoryFailure,
  editCategoryLoading,
  editCategorySuccess,
  resetEditCategoryError,
} = editCategorySlice.actions;

export default editCategorySlice.reducer;
