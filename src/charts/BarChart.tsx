import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BarChartProps, StatsData } from '../types';
import { useNetworkGet } from '../network';
import { useRefresh } from '../context/RefreshContext';

export default function BarChart(props: BarChartProps) {
  const [chartData, setChartData] = useState<StatsData>({ years: [], cites: [] });
  const refresh = useRefresh();

  const refetch = useNetworkGet(`fe/${props.route}/stats`, 'statsData', (data: StatsData) => {
    setChartData(data);
  });
  useEffect(() => {
    refresh.addRefetch(refetch);
  }, []);

  const series = [
    {
      name: 'citations',
      data: chartData.cites,
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
    },
    yaxis: {
      title: {
        text: 'Number of Citations',
      },
    },

    fill: {
      opacity: 1,
    },
  };

  return <ReactApexChart options={options} series={series} type="bar" height={300} width={1200} />;
}
