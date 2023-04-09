import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import moment, { Moment } from 'moment';
import { chartTheme } from 'utils/chart-theme';

echarts.registerTheme('dark', chartTheme);

interface Props {
  data: {
    date: string;
    total: number;
    count: number;
  }[];
  firstDate: Moment | string | Date;
}

interface ChartData {
  dt: number[];
  date: string[];
}

const PurchaseChart = ({ data, firstDate }: Props) => {
  const [chartData, setChartData] = useState<ChartData>();
  useEffect(() => {
    const dt = [];
    const date = [];
    const totalDays = moment(new Date()).diff(firstDate, 'days');
    const tempDate = moment(firstDate);
    for (let i = 1; i <= totalDays; i++) {
      const newDate = moment(tempDate).add(1, 'day').format('YYYY-MM-DD');
      tempDate.add(1, 'day');
      const findCount = data.filter((item) => item.date === newDate);
      findCount.length ? dt.push(findCount[0].total / 100) : dt.push(0);
      date.push(newDate);
    }

    setChartData({
      dt: dt,
      date: date,
    });
  }, [data]);

  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt: any) {
        return [pt[0], '10%'];
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartData?.date,
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: 'Revenue',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)',
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)',
            },
          ]),
        },
        data: chartData?.dt,
      },
    ],
  };

  return <ReactECharts option={option} theme='dark' />;
};

export default PurchaseChart;
