import { useCallback, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { TreeMapData, TreeMapProps } from '../../types';
import { useRefresh } from '../../context/RefreshContext';
import { useNetworkGet } from '../../network';
import ChartLoadingIcon from '../ChartLoadingIcon';
import { debounce, TextField } from '@mui/material';
import { DEBOUNCE_DELAY_K } from '../../consts';
import { useApexChartExport } from '../../tools';

export default function (props: TreeMapProps) {
  const [chartData, setChartData] = useState<TreeMapData>([]);
  const [k, setK] = useState<number>(20);
  const refresh = useRefresh();
  const queryKey = props.route + 'Treemap';

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/topk`,
    queryKey,
    (data: TreeMapData) => {
      setChartData(data);
    },
    { k: k }
  );

  useEffect(() => {
    refresh.addRefetch(queryKey, refetch);
    return () => {
      refresh.removeRefetch(queryKey);
    };
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
      toolbar: useApexChartExport('treemap', props.route, { k: k }),
    },
    title: {
      text: `C4: Top k ${props.xDimension} by ${props.yDimension}`,
      offsetY: 8,
    },
  };

  return (
    <ChartLoadingIcon isFetching={isFetching} className={'treemap'}>
      <div style={{ height: 250, position: 'relative' }}>
        <ReactApexChart options={options} series={series} type="treemap" height={250} />
        <TextField
          sx={{ position: 'absolute', top: '10px', left: '275px', width: '100px' }}
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
    </ChartLoadingIcon>
  );
}
