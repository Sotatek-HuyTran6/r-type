import { createSlice } from '@reduxjs/toolkit';
import { IParamPaymentList } from 'types/payment';

interface IPaymentList {
  data: any;
  loading: boolean;
  error: string;
  total: number;
  paramsData: IParamPaymentList;
}

const initialState: IPaymentList = {
  data: [],
  loading: false,
  error: '',
  total: 0,
  paramsData: {
    page: 0,
    size: 5,
    userEmail: '',
    sortBy: '',
    sortOrder: 'desc',
    paymentState: '',
    type: '1',
  },
};

const getPaymentSlice = createSlice({
  name: 'getPaymentList',
  initialState: initialState,
  reducers: {
    getPaymentLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    getPaymentSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload.payments;
      state.total = action.payload.totalPage;
    },
    getPaymentFailure: (state, action) => {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    },
    setParamPaymentList: (state, action) => {
      state.paramsData = action.payload
        ? { ...state.paramsData, ...action.payload }
        : initialState.paramsData;
    },
    setDataPaymentList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  getPaymentLoading,
  getPaymentSuccess,
  getPaymentFailure,
  setDataPaymentList,
  setParamPaymentList,
} = getPaymentSlice.actions;

export default getPaymentSlice.reducer;
