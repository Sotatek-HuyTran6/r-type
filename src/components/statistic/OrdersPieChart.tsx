import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { chartTheme } from 'utils/chart-theme';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid/models';

echarts.registerTheme('dark', chartTheme);

interface Props {
  data: {
    count: number;
    total: number;
    email: string;
    userId: string;
  }[];
}

const linearBg = [
  'linear-gradient(180deg, rgba(17,88,226,1) 0%, rgba(66,181,242,1) 100%)',
  'linear-gradient(180deg, rgba(188,31,215,1) 0%, rgba(127,29,209,1) 100%)',
  'linear-gradient(180deg, rgba(232,166,24,1) 0%, rgba(235,107,54,1) 100%)',
  'linear-gradient(180deg, rgba(209,49,190,1) 0%, rgba(191,21,117,1) 100%)',
];

const OrdersPieChart = ({ data }: Props) => {
  const dt = data.map((item) => {
    return {
      value: item.count,
      name: item.email,
    };
  });

  const option = {
    color: [
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: '#1158E2',
        },
        {
          offset: 1,
          color: '#42B5F2',
        },
      ]),
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: '#BC1FD7',
        },
        {
          offset: 1,
          color: '#7F1DD1',
        },
      ]),
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: '#E8A618',
        },
        {
          offset: 1,
          color: '#EB6B36',
        },
      ]),
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: '#D131BE',
        },
        {
          offset: 1,
          color: '#BF1575',
        },
      ]),
    ],
    series: [
      {
        name: 'Item',
        type: 'pie',
        radius: ['60%', '90%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 50,
          borderColor: 'black',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        data: dt,
      },
    ],
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ marginTop: '16px' }}>
        <div
          style={{
            marginTop: '8px',
            display: 'flex',
            color: 'white',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              // backgroundImage: linearBg[index],
              borderRadius: '6px',
            }}
          ></div>
          <span style={{ display: 'inline-block', width: '200px', overflow: 'hidden' }}>Email</span>
          <span>Total (VND)</span>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                marginTop: '8px',
                display: 'flex',
                color: '#cccccc',
                fontSize: '.9rem',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundImage: linearBg[index],
                  borderRadius: '6px',
                }}
              ></div>
              <span style={{ display: 'inline-block', width: '200px', overflow: 'hidden' }}>
                {item.email}
              </span>
              <span>{item.total}</span>
            </div>
          );
        })}
      </div>
      <ReactECharts style={{ height: 220, marginTop: '1rem', width: 300 }} option={option} />
    </div>
  );
};

export default OrdersPieChart;
