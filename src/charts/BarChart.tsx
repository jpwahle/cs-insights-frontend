import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BarChartProps, StatsData } from '../types';
import { useNetworkGet } from '../network';
import { useRefresh } from '../context/RefreshContext';

export default function BarChart(props: BarChartProps) {
  const [chartData, setChartData] = useState<StatsData>({ years: [], counts: [] });
  const refresh = useRefresh();
  const labelColors = chartData.counts.map((value) => (value > 0 ? 'rgb(55, 61, 63)' : '#b6b6b6'));

  const refetch = useNetworkGet(`fe/${props.route}/stats`, 'statsData', (data: StatsData) => {
    setChartData(data);
  });

  useEffect(() => {
    refresh.addRefetch(refetch);
  }, []);

  const series = [
    {
      name: '#' + props.yDimension,
      data: chartData.counts,
    },
  ];

  const options = {
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '100%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: chartData.years,
      title: {
        text: 'Year of publication',
      },
      labels: {
        style: {
          colors: labelColors,
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of ' + props.yDimension,
      },
    },

    fill: {
      opacity: 1,
    },
  };

  return <ReactApexChart options={options} series={series} type="bar" height={300} width={1200} />;
}
