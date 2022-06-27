import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { TreeMapData, TreeMapProps } from '../types';
import { useRefresh } from '../context/RefreshContext';
import { useNetworkGet } from '../network';
import LoadingCircle from '../components/LoadingCircle';

export default function (props: TreeMapProps) {
  const [chartData, setChartData] = useState<TreeMapData>([]);
  const refresh = useRefresh();

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/topk`,
    'treemapData' + props.route,
    (data: TreeMapData) => {
      console.log(data);
      setChartData(data);
    },
    { page: 0, pageSize: 100, sortField: 'inCitationsCount' }
  );

  useEffect(() => {
    refresh.addRefetch(refetch);
  }, []);

  const series = [
    {
      data: chartData,
    },
  ];
  const options: ApexOptions = {
    legend: {
      show: false,
    },
    title: {
      text: `Top ${100} by ${props.yDimension}`,
    },
    xaxis: {
      labels: {
        style: {
          fontSize: '20px',
        },
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
        width={'98%'}
        // style={{ overflow: 'hidden', fontSize: "20px !important" }}
        // className={}
      />
    </LoadingCircle>
  );
}
