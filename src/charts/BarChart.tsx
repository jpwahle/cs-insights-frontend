//@ts-nocheck
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BarChartProps, StatsData } from '../types';
import { useNetwork } from '../network';

export default function BarChart(props: BarChartProps) {
  const [chartData, setChartData] = useState<StatsData>({ years: [], cites: [] });

  // const refetch = useNetworkFilterGet(
  //   `fe/${props.route}/stats`,
  //   'stats',
  //   (data: { timeData: StatsData }) => {
  //     // if ('cites' in data.timeData) {
  //     setChartData(data.timeData);
  //     // }
  //   },
  //   props.refetch
  // );
  //
  // useEffect(() => {
  //   if (props.refetch !== 0) {
  //     refetch();
  //   }
  // }, [props.refetch]);

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
