import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BarChartProps, YearsData } from '../../types';
import { useNetworkGet } from '../../network';
import { useRefresh } from '../../context/RefreshContext';
import { capitalize } from '@mui/material';
import ChartLoadingIcon from '../ChartLoadingIcon';
import { useApexChartExport } from '../../tools';

export default function BarChart(props: BarChartProps) {
  const [chartData, setChartData] = useState<YearsData>({ years: [], counts: [] });
  const refresh = useRefresh();
  const labelColors = chartData.counts.map((value) => (value > 0 ? 'rgb(55, 61, 63)' : '#b6b6b6'));
  const queryKey = props.route + 'Barchart';

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/years`,
    queryKey,
    (data: YearsData) => {
      setChartData(data);
    }
  );

  useEffect(() => {
    refresh.addRefetch(queryKey, refetch);
    return () => {
      refresh.removeRefetch(queryKey);
    };
  }, []);

  const series = [
    {
      name: '#' + props.xDimension,
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
      text: `C1: #${capitalize(props.xDimension)} per year`,
    },
    xaxis: {
      categories: chartData.years,
      title: {
        text: 'Year',
        offsetY: -4 * Math.sqrt(chartData.years.length), // The label can be very far away from the actual chart
      },
      labels: {
        style: {
          colors: labelColors,
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of ' + props.xDimension,
      },
    },
    fill: {
      opacity: 1,
    },
    chart: {
      parentHeightOffset: 0,
      toolbar: useApexChartExport('barchart', props.route),
    },
  };

  return (
    <ChartLoadingIcon
      isFetching={isFetching}
      className={props.className ? props.className : 'barchart'}
    >
      <ReactApexChart options={options} series={series} type="bar" height={250} />
    </ChartLoadingIcon>
  );
}
