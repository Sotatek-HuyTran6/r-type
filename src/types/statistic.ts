import { Moment } from 'moment';

export interface TopPurchaseStatistic {
  data: any;
  loading: boolean;
  error: string;
  total: number;
  paramsData: ParamsTopPurchaseStatistic;
}

export interface ParamsTopPurchaseStatistic {
  dateFrom: string | Moment | Date;
  dateTo: string | Moment | Date;
  option?: {
    title: string;
    value: 14 | 30 | 90;
  };
}

export interface PurchaseStatistic {
  data: any;
  loading: boolean;
  error: string;
  total: number;
  paramsData: ParamsPurchaseStatistic;
}

export interface ParamsPurchaseStatistic {
  separateBy: 'month' | 'date';
  dateFrom: Moment | Date | string;
  dateTo: Moment | Date | string;
  type?: '1' | '2' | ''; // 1 is manual, 2 is vnpay
  option?: {
    title: string;
    value: 14 | 30 | 90;
  };
}

export interface HousesStatistic {
  data: any;
  loading: boolean;
  error: string;
  total: number;
  paramsData: ParamsHousesStatistic;
}

export interface ParamsHousesStatistic {
  separateBy: 'month' | 'date';
  dateFrom: string | Date | Moment;
  dateTo: string | Date | Moment;
  type?: '1' | '2' | '3' | '4' | '5' | '';
  category?: '1' | '2' | '';
  option?: {
    title: string;
    value: 14 | 30 | 90;
  };
}
