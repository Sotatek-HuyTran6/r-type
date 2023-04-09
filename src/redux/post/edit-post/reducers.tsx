import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: '',
};

const editPostSlice = createSlice({
  name: 'editPost',
  initialState: initialState,
  reducers: {
    editPostLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    editPostSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
    editPostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetEditPostError: (state) => {
      state.loading = false;
      state.error = '';
    },
  },
});

export const { editPostFailure, editPostLoading, editPostSuccess, resetEditPostError } =
  editPostSlice.actions;

export default editPostSlice.reducer;
