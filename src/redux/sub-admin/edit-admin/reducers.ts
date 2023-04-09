import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: '',
};

const editAdminSlice = createSlice({
  name: 'editAdmin',
  initialState: initialState,
  reducers: {
    editAdminLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    editAdminSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
    editAdminFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetEditAdminError: (state) => {
      state.loading = false;
      state.error = '';
    },
  },
});

export const { editAdminFailure, editAdminLoading, editAdminSuccess, resetEditAdminError } =
  editAdminSlice.actions;

export default editAdminSlice.reducer;
