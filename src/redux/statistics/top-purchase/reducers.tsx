import { createSlice } from '@reduxjs/toolkit';
import { TopPurchaseStatistic } from 'types/statistic';
import { statisticOption } from 'utils/options';

const initialState: TopPurchaseStatistic = {
  data: [],
  loading: false,
  error: '',
  total: 0,
  paramsData: {
    dateFrom: '2022-1-1',
    dateTo: '2022-3-29',
    option: statisticOption[0],
  },
};

const getTopPurchaseStatisticSlice = createSlice({
  name: 'getTopPurchaseStatistic',
  initialState: initialState,
  reducers: {
    getTopPurchaseStatisticLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    getTopPurchaseStatisticSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
    getTopPurchaseStatisticFailure: (state, action) => {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    },
    setParamTopPurchaseStatistic: (state, action) => {
      state.paramsData = action.payload
        ? { ...state.paramsData, ...action.payload }
        : initialState.paramsData;
    },
    setDataTopPurchaseStatistic: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  getTopPurchaseStatisticLoading,
  getTopPurchaseStatisticSuccess,
  getTopPurchaseStatisticFailure,
  setDataTopPurchaseStatistic,
  setParamTopPurchaseStatistic,
} = getTopPurchaseStatisticSlice.actions;

export default getTopPurchaseStatisticSlice.reducer;
