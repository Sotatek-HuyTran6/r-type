import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: '',
  total: 0,
  paramsData: {
    page: 1,
    size: 5,
    searchPhrase: '',
  },
};

const categorySlice = createSlice({
  name: 'categoryList',
  initialState: initialState,
  reducers: {
    getCategoryLoading: (state) => {
      state.loading = true;
      state.error = '';
    },
    getCategorySuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload.data.data;
      state.total = action.payload.data?.count[0];
    },
    getCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    },
    setParamCategory: (state, action) => {
      state.paramsData = action.payload
        ? { ...state.paramsData, ...action.payload }
        : initialState.paramsData;
    },
    setDataCategory: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  getCategoryLoading,
  getCategorySuccess,
  getCategoryFailure,
  setDataCategory,
  setParamCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
