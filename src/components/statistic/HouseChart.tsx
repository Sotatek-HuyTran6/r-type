import React, { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import moment, { Moment } from 'moment';
import { chartTheme } from 'utils/chart-theme';
interface Props {
  data: {
    date: string;
    total: number;
    count: number;
  }[];
  firstDate: string | Date | Moment;
}

const HouseChart = ({ data, firstDate }: Props) => {
  echarts.registerTheme('dark', chartTheme);

  // const firstDate = new Date('2023-03-03');

  const dt = [];
  const date = [];
  const totalDays = moment(new Date()).diff(firstDate, 'days');

  const tempDate = moment(firstDate);
  for (let i = 1; i <= totalDays; i++) {
    const newDate = moment(tempDate).add(1, 'day').format('YYYY-MM-DD');
    tempDate.add(1, 'day');
    const findCount = data.filter((item) => item.date === newDate);
    findCount.length ? dt.push(findCount[0].count) : dt.push(0);
    date.push(newDate);
  }

  const option = {
    color: ['var(--orange)'],
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      backgroundColor: 'rgba(0, 0, 0, 0.59)',
      borderWidth: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      show: false,
    },

    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: date,
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        type: 'line',
        smooth: true,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#1158E2',
            },
            {
              offset: 1,
              color: '#42B5F2',
            },
          ]),
          width: 4,
        },
        areaStyle: {
          opacity: 0.3,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#1158E2',
            },
            {
              offset: 1,
              color: '#42B5F2',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        showSymbol: false,
        data: dt,
      },
    ],
  };

  return <ReactECharts option={option} theme='dark' />;
};

export default HouseChart;
