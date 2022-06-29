import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BarChartProps, YearsData } from '../../types';
import { useNetworkGet } from '../../network';
import { useRefresh } from '../../context/RefreshContext';
import LoadingCircle from '../LoadingCircle';
import { capitalize } from '@mui/material';

export default function BarChart(props: BarChartProps) {
  const [chartData, setChartData] = useState<YearsData>({ years: [], counts: [] });
  const refresh = useRefresh();
  const labelColors = chartData.counts.map((value) => (value > 0 ? 'rgb(55, 61, 63)' : '#b6b6b6'));

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/years`,
    'yearsData' + props.route,
    (data: YearsData) => {
      setChartData(data);
    }
  );

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
    title: {
      text: `${capitalize(props.yDimension)} per year`,
    },
    xaxis: {
      categories: chartData.years,
      title: {
        text: 'Year',
        offsetY: -4 * Math.sqrt(chartData.years.length),
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
    chart: {
      parentHeightOffset: 0,
    },
  };

  return (
    <LoadingCircle isFetching={isFetching}>
      <ReactApexChart options={options} series={series} type="bar" height={250} width={'100%'} />
    </LoadingCircle>
  );
}
