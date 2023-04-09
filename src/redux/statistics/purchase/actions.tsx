import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { API } from 'redux/api-route';
import {
  getPurchaseStatisticFailure,
  getPurchaseStatisticLoading,
  getPurchaseStatisticSuccess,
} from './reducers';
import { ParamsPurchaseStatistic } from 'types/statistic';

export const getPurchaseStatistic =
  (params: ParamsPurchaseStatistic) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getPurchaseStatisticLoading());
      const res: any = await AxiosUtils.get(API.purchase, params);
      dispatch(getPurchaseStatisticSuccess(res.data));
    } catch (err) {
      dispatch(getPurchaseStatisticFailure(err));
    }
  };
