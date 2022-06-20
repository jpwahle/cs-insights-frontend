import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BarChartProps, YearsData } from '../types';
import { useNetworkGet } from '../network';
import { useRefresh } from '../context/RefreshContext';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

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
      text: props.title,
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
    <div>
      <Box sx={{ position: 'relative' }}>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height="250px"
          width="1200px"
        />
        {isFetching ? (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              top: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : null}
      </Box>
    </div>
  );
}
