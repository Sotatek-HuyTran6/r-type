import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { PurchaseStatistic } from 'types/statistic';
import { statisticOption } from 'utils/options';

const initialState: PurchaseStatistic = {
  data: [],
  loading: false,
  error: '',
  total: 0,
  paramsData: {
    separateBy: 'date',
    dateFrom: new Date('2023/01/01').toString(),
    dateTo: new Date('2023/03/29').toString(),
    type: '',
    option: statisticOption[0],
  },
};

const getPurchaseStatisticSlice = createSlice({
  name: 'getPurchaseStatistic',
  initialState: initialState,
  reducers: {
    getPurchaseStatisticLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    getPurchaseStatisticSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
    getPurchaseStatisticFailure: (state, action) => {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    },
    setParamPurchaseStatistic: (state, action) => {
      state.paramsData = action.payload
        ? { ...state.paramsData, ...action.payload }
        : initialState.paramsData;
    },
    setDataPurchaseStatistic: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  getPurchaseStatisticLoading,
  getPurchaseStatisticSuccess,
  getPurchaseStatisticFailure,
  setDataPurchaseStatistic,
  setParamPurchaseStatistic,
} = getPurchaseStatisticSlice.actions;

export default getPurchaseStatisticSlice.reducer;
