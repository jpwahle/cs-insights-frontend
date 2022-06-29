import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { TreeMapData, TreeMapProps } from '../../types';
import { useRefresh } from '../../context/RefreshContext';
import { useNetworkGet } from '../../network';
import LoadingCircle from '../LoadingCircle';

export default function (props: TreeMapProps) {
  const [chartData, setChartData] = useState<TreeMapData>([]);
  const [k, setK] = useState<number>(100);
  const refresh = useRefresh();

  console.log('render');

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/topk`,
    'treemapData' + props.route,
    (data: TreeMapData) => {
      setChartData(data);
    },
    { k: k, metric: 'inCitationsCount' }
  );

  //TODO remove
  console.log(setK);

  useEffect(() => {
    refresh.addRefetch(refetch);
  }, []);

  const series = [
    {
      data: chartData,
    },
  ];
  const options: ApexOptions = {
    chart: {
      type: 'treemap',
    },
    legend: {
      show: false,
    },
    title: {
      text: `Top ${'k'} by ${props.yDimension}`,
    },
    xaxis: {
      type: 'category',
      categories: ['citations'],
      labels: {
        style: {
          fontSize: '20px !important',
        },
      },
      title: {
        text: 'test12345',
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '100px',
      },
    },
  };

  return (
    <LoadingCircle isFetching={isFetching}>
      <ReactApexChart
        options={options}
        series={series}
        type="treemap"
        height={250}
        width={'99%'}
        className={'treemap'}
      />
    </LoadingCircle>
  );
}
