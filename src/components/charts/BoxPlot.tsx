import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BoxPlotProps, QuartilesData } from '../../types';
import { useNetworkGet } from '../../network';
import { useRefresh } from '../../context/RefreshContext';
import { capitalize } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import LoadingCircle from '../LoadingCircle';
import { useExport } from '../../tools';

export default function BoxPlot(props: BoxPlotProps) {
  const [chartData, setChartData] = useState<QuartilesData>([]);
  const refresh = useRefresh();

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/quartiles`,
    'quartilesData' + props.route,
    (data: QuartilesData) => {
      setChartData(data);
    }
  );

  useEffect(() => {
    refresh.addRefetch(refetch);
  }, []);

  const series = [
    {
      name: 'box',
      type: 'boxPlot',
      data: [
        {
          x: capitalize(props.xLabel),
          y: chartData,
        },
      ],
    },
  ];

  const options: ApexOptions = {
    title: {
      text: `${capitalize(props.xLabel)} distribution`,
      align: 'left',
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
    chart: {
      toolbar: {
        offsetY: 18,
        ...useExport('boxplot', props.route),
      },
    },
  };

  // Without this the plot is not showing and the window has to be manually resized to show it
  window.dispatchEvent(new Event('resize'));

  return (
    <LoadingCircle isFetching={isFetching} className={'boxplot'}>
      <ReactApexChart
        options={options}
        series={series}
        type="boxPlot"
        height={'530px'}
        width={'180px'}
      />
    </LoadingCircle>
  );
}
