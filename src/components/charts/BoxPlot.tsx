import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BoxPlotProps, QuartilesData } from '../../types';
import { useNetworkGet } from '../../network';
import { useRefresh } from '../../context/RefreshContext';
import { capitalize } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import LoadingCircle from '../LoadingCircle';

export default function BoxPlot(props: BoxPlotProps) {
  const [chartData, setChartData] = useState<QuartilesData>([]);
  const refresh = useRefresh();

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/quartiles`,
    'quartilesData' + props.route,
    (data: QuartilesData) => {
      setChartData(data);
    },
    { metric: 'inCitationsCount' }
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
      },
    },
  };

  // Without this the plot is not showing and the window has to be manually resized to show it
  // window.dispatchEvent(new Event('resize'));
  // console.log('triggered');

  return (
    <LoadingCircle isFetching={isFetching}>
      <ReactApexChart options={options} series={series} type="boxPlot" height={550} width={180} />
    </LoadingCircle>
  );
}
