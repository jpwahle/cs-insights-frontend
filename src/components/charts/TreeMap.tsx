import React, { useCallback, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { TreeMapData, TreeMapProps } from '../../types';
import { useRefresh } from '../../context/RefreshContext';
import { useNetworkGet } from '../../network';
import LoadingCircle from '../LoadingCircle';
import { debounce, TextField } from '@mui/material';
import { DEBOUNCE_DELAY_K } from '../../consts';
import { useExport } from '../../tools';

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

  // outside useEffect(), so debounce reference does not get lost
  const handleInputChangeDebounce = useCallback(
    debounce(async () => {
      refetch();
    }, DEBOUNCE_DELAY_K),
    []
  );

  useEffect(() => {
    if (chartData.length > 0 && k) {
      handleInputChangeDebounce();
    }
  }, [k]);

  const series = [
    {
      data: chartData,
    },
  ];
  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: useExport('treemap', props.route, { k: k }),
    },
    title: {
      text: `Top k by ${props.yDimension}`,
      offsetY: 8,
    },
  };

  return (
    <LoadingCircle isFetching={isFetching} className={'treemap'}>
      <div style={{ height: 250, width: '100%', position: 'relative' }}>
        <ReactApexChart options={options} series={series} type="treemap" height={250} />
        <TextField
          sx={{ position: 'absolute', top: '10px', left: '150px', width: '100px' }}
          size={'small'}
          label={'k ='}
          value={k.toString()}
          type={'number'}
          className={'treemapTextField'}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
          onChange={(event) => (event.target.value ? setK(parseInt(event.target.value)) : setK(0))}
        />
      </div>
    </LoadingCircle>
  );
}
