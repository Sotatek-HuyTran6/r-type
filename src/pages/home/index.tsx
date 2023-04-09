import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getHousesStatistic } from 'redux/statistics/houses/actions';
import { getPurchaseStatistic } from 'redux/statistics/purchase/actions';
import { getTopPurchaseStatistic } from 'redux/statistics/top-purchase/actions';
import { AppDispatch, RootState } from 'types/redux';
import ReactECharts from 'echarts-for-react';
import {
  ParamsHousesStatistic,
  ParamsPurchaseStatistic,
  ParamsTopPurchaseStatistic,
} from 'types/statistic';
import LineChart from 'components/statistic/LineChart';
import OrdersPieChart from 'components/statistic/OrdersPieChart';
import PurchaseChart from 'components/statistic/PurchaseChart';
import HouseChart from 'components/statistic/HouseChart';
import { statisticOption } from 'utils/options';
import StatisticFilter from 'components/filter/statistic-filter';

const Home = () => {
  const dispatch = useDispatch() as AppDispatch;
  const [purchaseParams, setPurchaseParams] = useState<ParamsPurchaseStatistic>({
    separateBy: 'date',
    dateFrom: moment().subtract(statisticOption[0].value, 'days'),
    dateTo: moment(),
    type: '', // 1 is manual, 2 is vnpay
    option: statisticOption[0],
  });

  const [topPurchaseParams, setTopPurchaseParams] = useState<ParamsTopPurchaseStatistic>({
    dateFrom: moment().subtract(statisticOption[0].value, 'days'),
    dateTo: moment(),
    option: statisticOption[0],
  });

  const [houseParams, setHouseParams] = useState<ParamsHousesStatistic>({
    separateBy: 'date',
    dateFrom: moment().subtract(statisticOption[0].value, 'days'),
    dateTo: moment(),
    type: '',
    category: '',
    option: statisticOption[0],
  });

  const topPurchaseStatistic = useSelector((state: RootState) => state.topPurchaseStatistics);
  const {
    data: topPurchaseData,
    error: topPurchaseError,
    loading: topPurchaseLoading,
  } = topPurchaseStatistic;

  const houseStatistic = useSelector((state: RootState) => state.houseStatistics);
  const { data: houseData, error: houseError, loading: houseLoading } = houseStatistic;

  const purchaseStatistics = useSelector((state: RootState) => state.purchaseStatistics);
  const { data: purchaseData, error: purchaseError, loading: purchaseLoading } = purchaseStatistics;

  useEffect(() => {
    dispatch(
      getPurchaseStatistic({
        separateBy: purchaseParams.separateBy,
        type: purchaseParams.type, // 1 is manual, 2 is vnpay
        dateFrom: moment(purchaseParams.dateFrom).format('YYYY-MM-DD'),
        dateTo: moment(purchaseParams.dateTo).format('YYYY-MM-DD'),
      }),
    );
  }, [dispatch, purchaseParams]);

  useEffect(() => {
    dispatch(
      getHousesStatistic({
        separateBy: houseParams.separateBy,
        type: houseParams.type,
        category: houseParams.category,
        dateFrom: moment(houseParams.dateFrom).format('YYYY-MM-DD'),
        dateTo: moment(houseParams.dateTo).format('YYYY-MM-DD'),
      }),
    );
  }, [dispatch, houseParams]);

  useEffect(() => {
    dispatch(
      getTopPurchaseStatistic({
        dateFrom: moment(topPurchaseParams.dateFrom).format('YYYY-MM-DD'),
        dateTo: moment(topPurchaseParams.dateTo).format('YYYY-MM-DD'),
      }),
    );
  }, [dispatch, topPurchaseParams]);

  const handleChangeTopPurchaseOption = (payload: { title: string; value: 14 | 30 | 90 }) => {
    setTopPurchaseParams({
      ...topPurchaseParams,
      option: payload,
      dateFrom: moment().subtract(payload.value, 'days'),
    });
  };

  const handleChangePurchaseOption = (payload: { title: string; value: 14 | 30 | 90 }) => {
    setPurchaseParams({
      ...purchaseParams,
      option: payload,
      dateFrom: moment().subtract(payload.value, 'days'),
    });
  };

  const handleChangeHouseOption = (payload: { title: string; value: 14 | 30 | 90 }) => {
    setHouseParams({
      ...houseParams,
      option: payload,
      dateFrom: moment().subtract(payload.value, 'days'),
    });
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#100C2A',
          padding: '8px 32px',
          marginBottom: '16px',
          borderRadius: '6px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <p style={{ color: 'white', fontSize: '1.4rem' }}>Top Purchase Overview</p>
          <StatisticFilter
            handleChange={handleChangeTopPurchaseOption}
            value={topPurchaseParams.option?.value}
          />
        </div>
        <div>
          <OrdersPieChart data={topPurchaseData} />
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#100C2A',
          padding: '8px',
          marginBottom: '16px',
          borderRadius: '6px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <p style={{ color: 'white', fontSize: '1.4rem' }}>Purchase Traffic Overview</p>
          <StatisticFilter
            handleChange={handleChangePurchaseOption}
            value={purchaseParams.option?.value}
          />
        </div>
        <LineChart firstDate={purchaseParams.dateFrom} data={purchaseData} />
      </div>
      <div
        style={{
          backgroundColor: '#100C2A',
          padding: '8px',
          marginBottom: '16px',
          borderRadius: '6px',
        }}
      >
        <p style={{ color: 'white', marginLeft: '32px', fontSize: '1.4rem' }}>
          Purchase Revenue Overview
        </p>
        <PurchaseChart data={purchaseData} firstDate={purchaseParams.dateFrom}></PurchaseChart>
      </div>
      <div
        style={{
          backgroundColor: '#100C2A',
          padding: '8px',
          marginBottom: '16px',
          borderRadius: '6px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <p style={{ color: 'white', fontSize: '1.4rem' }}>New Post Traffic Overview</p>
          <StatisticFilter
            handleChange={handleChangeHouseOption}
            value={houseParams.option?.value}
          />
        </div>
        <HouseChart firstDate={houseParams.dateFrom} data={houseData}></HouseChart>
      </div>
    </div>
  );
};

export default Home;
