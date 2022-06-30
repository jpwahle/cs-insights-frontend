import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { TreeMapData, TreeMapProps } from '../../types';
import { useRefresh } from '../../context/RefreshContext';
import { useNetworkGet } from '../../network';
import LoadingCircle from '../LoadingCircle';
import { TextField } from '@mui/material';

export default function (props: TreeMapProps) {
  const [chartData, setChartData] = useState<TreeMapData>([]);
  const [k, setK] = useState<number>(20);
  const refresh = useRefresh();

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/topk`,
    'treemapData' + props.route,
    (data: TreeMapData) => {
      setChartData(data);
    },
    { k: k }
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
    chart: {
      type: 'treemap',
    },
    title: {
      text: `Top ${'k'} by ${props.yDimension}`,
    },
  };

  function handleInputChange(newValue: string) {
    setK(parseInt(newValue));
  }

  return (
    <LoadingCircle isFetching={isFetching}>
      <div style={{ height: 300, width: '100%', position: 'relative' }}>
        <ReactApexChart
          options={options}
          series={series}
          type="treemap"
          height={250}
          width={'99%'}
          className={'treemap'}
        />
        <TextField
          sx={{ position: 'absolute', top: '0px', left: '150px', width: '100px' }}
          size={'small'}
          label={'k ='}
          value={k}
          type={'number'}
          onChange={(event) => handleInputChange(event.target.value)}
        />
      </div>
    </LoadingCircle>
  );
}
