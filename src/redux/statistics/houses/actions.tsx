import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { API } from 'redux/api-route';
import {
  getHousesStatisticFailure,
  getHousesStatisticLoading,
  getHousesStatisticSuccess,
} from './reducers';
import { ParamsHousesStatistic } from 'types/statistic';

export const getHousesStatistic =
  (params: ParamsHousesStatistic) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getHousesStatisticLoading());
      const res: any = await AxiosUtils.get(API.houses, params);
      dispatch(getHousesStatisticSuccess(res.data));
    } catch (err) {
      dispatch(getHousesStatisticFailure(err));
    }
  };
