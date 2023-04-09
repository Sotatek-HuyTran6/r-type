import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'types/redux';
import { useDispatch } from 'react-redux';
import CutomizedTable from './../../../components/table';
import { CustomTableColumn } from 'types/common';
import { Typography, Avatar, Box, Button } from '@mui/material';
import SearchInput from 'components/search-input';
import _ from 'lodash';
import { setDataPaymentList, setParamPaymentList } from 'redux/payment/payment-list/reducers';
import { getPaymentList } from 'redux/payment/payment-list/actions';
import moment from 'moment';
import { verifyPayment } from 'redux/payment/verify-payment/actions';
import { Payment } from 'types/payment';
import PaymentFilter from 'components/filter/payment-filter';

function PaymentList() {
  const dispatch = useDispatch() as AppDispatch;
  const paymentList = useSelector((state: RootState) => state.paymentList);
  const { data, error, loading, total, paramsData } = paymentList;

  const pagination = {
    current: paramsData.page,
    pageSize: paramsData.size,
    total: total,
    onChange: (current: number, size: number) => {
      dispatch(setParamPaymentList({ ...paramsData, page: current, size: size }));
    },
  };

  const onSearchChange = (value: string) => {
    dispatch(setParamPaymentList({ ...paramsData, userEmail: value }));
  };

  const onDelete = () => {
    console.log('this');
  };

  const handleViewDetail = (record: any) => {
    console.log(record);
  };

  const handleVerifyPayment = (id: string | number) => {
    dispatch(
      verifyPayment({
        paymentId: id,
        state: 'done',
      }),
    ).then((status: boolean) => {
      if (status) {
        const newPayments = [...data];
        const index = _.findIndex(data, (item: Payment) => item.paymentId === id);
        newPayments[index] = {
          ...newPayments[index],
          state: 'done',
        };
        console.log(newPayments);
        dispatch(setDataPaymentList([...newPayments]));
      }
    });
  };

  const columns: CustomTableColumn[] = [
    {
      title: 'Email',
      align: 'left',
      key: 'email',
      width: 70,
      render: (title: string) => {
        return <div>{title}</div>;
      },
    },
    {
      title: 'Create at',
      align: 'left',
      key: 'createdAt',
      width: 70,
      render: (text: any) => {
        return <div>{moment(new Date(text)).format('DD/MM/YYYY')}</div>;
      },
    },
    {
      title: 'Total',
      align: 'left',
      key: 'total',
      width: 70,
      render: (total: number) => {
        return <div>{(total / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>;
      },
    },
    {
      title: 'Payment description',
      align: 'left',
      key: 'paymentDescription',
      width: 70,
      render: (title: string) => {
        return <div>{title}</div>;
      },
    },
    {
      title: 'Type',
      align: 'left',
      key: 'type',
      width: 70,
      render: (title: string) => {
        return <div>{title}</div>;
      },
    },
    {
      title: 'State',
      align: 'left',
      key: 'state',
      width: 70,
      render: (title: string) => {
        return <div>{title}</div>;
      },
    },
    {
      title: 'Status',
      align: 'left',
      key: 'paymentId',
      width: 70,
      render: (paymentId: string | number, record: Payment) => {
        return (
          <div style={{ display: 'flex' }}>
            <Button
              color={
                record.state === 'pending' && record.type === 'manual' ? 'primary' : 'secondary'
              }
              sx={{ textTransform: 'capitalize' }}
              onClick={() => {
                record.state === 'pending' &&
                  record.type === 'manual' &&
                  handleVerifyPayment(paymentId);
              }}
            >
              {record.state === 'pending' && record.type === 'manual' ? 'Verify' : 'Verified'}
            </Button>
          </div>
        );
      },
    },
  ];

  const handleFilterOnChange = (payload: any) => {
    dispatch(setParamPaymentList({ ...paramsData, ...payload }));
  };

  useEffect(() => {
    dispatch(getPaymentList(paramsData));
  }, [dispatch, paramsData]);

  useEffect(() => {
    return () => {
      dispatch(setParamPaymentList(null));
      dispatch(setDataPaymentList([]));
    };
  }, []);

  return (
    <div className='category-list'>
      <Typography variant='h4' sx={{ marginBottom: '72px', color: '#bd93f9', fontWeight: '500' }}>
        Payment
      </Typography>
      <div>
        <SearchInput onSearchChange={onSearchChange}></SearchInput>
      </div>
      <PaymentFilter
        type={paramsData.type}
        onChange={handleFilterOnChange}
        paymentState={paramsData.paymentState === '' ? 'all' : paramsData.paymentState}
      />
      <div>
        <CutomizedTable rows={data} columns={columns} pagination={pagination}></CutomizedTable>
      </div>
    </div>
  );
}

export default PaymentList;
