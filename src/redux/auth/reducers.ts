import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
  isTokenExpired: false,
  myInfo: null,
};

const sessionSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    getAuthLoading: (state) => {
      state.isLoading = true;
    },
    getMyInfo: (state, action) => {
      state.myInfo = action.payload;
      state.isLoading = false;
    },
    getAuthSuccess: (state, action) => {
      state.data = action?.payload;
      state.isLoading = false;
    },
    getAuthFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeAuth: (state, action) => {
      state.isLoading = false;
      state.error = '';
    },
    changeTokenExpired: (state) => {
      state.data = null;
      state.error = '';
      state.isLoading = false;
      state.isTokenExpired = true;
    },
  },
});

export const {
  getAuthLoading,
  getAuthFailure,
  getAuthSuccess,
  removeAuth,
  changeTokenExpired,
  getMyInfo,
} = sessionSlice.actions;

export default sessionSlice.reducer;
