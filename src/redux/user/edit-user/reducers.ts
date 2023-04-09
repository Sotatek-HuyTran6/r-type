import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: '',
};

const editUserSlice = createSlice({
  name: 'editUser',
  initialState: initialState,
  reducers: {
    editUserLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    editUserSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
    editUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    reseteditUserError: (state) => {
      state.loading = false;
      state.error = '';
    },
  },
});

export const { editUserFailure, editUserLoading, editUserSuccess, reseteditUserError } =
  editUserSlice.actions;

export default editUserSlice.reducer;
