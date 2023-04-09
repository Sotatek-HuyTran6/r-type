import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: '',
};

const verifyPaymentSlice = createSlice({
  name: 'verifyPayment',
  initialState: initialState,
  reducers: {
    verifyPaymentLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    verifyPaymentSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
    verifyPaymentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetverifyPaymentError: (state) => {
      state.loading = false;
      state.error = '';
    },
  },
});

export const {
  verifyPaymentFailure,
  verifyPaymentLoading,
  verifyPaymentSuccess,
  resetverifyPaymentError,
} = verifyPaymentSlice.actions;

export default verifyPaymentSlice.reducer;
