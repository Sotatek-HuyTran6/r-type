import { createSlice } from '@reduxjs/toolkit';
import { HousesStatistic } from 'types/statistic';
import { statisticOption } from 'utils/options';

const initialState: HousesStatistic = {
  data: [],
  loading: false,
  error: '',
  total: 0,
  paramsData: {
    separateBy: 'date',
    dateFrom: '2022-1-1',
    dateTo: '2022-3-29',
    type: '',
    category: '',
    option: statisticOption[0],
  },
};

const getHousesStatisticSlice = createSlice({
  name: 'getHousesStatistic',
  initialState: initialState,
  reducers: {
    getHousesStatisticLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    getHousesStatisticSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    },
    getHousesStatisticFailure: (state, action) => {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    },
    setParamHousesStatistic: (state, action) => {
      state.paramsData = action.payload
        ? { ...state.paramsData, ...action.payload }
        : initialState.paramsData;
    },
    setDataHousesStatistic: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  getHousesStatisticLoading,
  getHousesStatisticSuccess,
  getHousesStatisticFailure,
  setDataHousesStatistic,
  setParamHousesStatistic,
} = getHousesStatisticSlice.actions;

export default getHousesStatisticSlice.reducer;
