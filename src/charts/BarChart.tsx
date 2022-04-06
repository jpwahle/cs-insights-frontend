import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ChartOverTimeProps } from '../types';

function BarChart(props: ChartOverTimeProps) {
  const series = [
    {
      name: 'citations',
      data: props.values,
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
      categories: props.labels,
    },
    fill: {
      opacity: 1,
    },
  };

  return <ReactApexChart options={options} series={series} type="bar" height={300} width={1200} />;
}

export default BarChart;
