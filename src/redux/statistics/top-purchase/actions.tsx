import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { API } from 'redux/api-route';
import {
  getTopPurchaseStatisticFailure,
  getTopPurchaseStatisticLoading,
  getTopPurchaseStatisticSuccess,
} from './reducers';
import { ParamsTopPurchaseStatistic } from 'types/statistic';

export const getTopPurchaseStatistic =
  (params: ParamsTopPurchaseStatistic) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getTopPurchaseStatisticLoading());
      const res: any = await AxiosUtils.get(API.topPurchase, params);
      dispatch(getTopPurchaseStatisticSuccess(res.data));
    } catch (err) {
      dispatch(getTopPurchaseStatisticFailure(err));
    }
  };
