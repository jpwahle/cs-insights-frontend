import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BoxPlotProps, QuartilesData } from '../../types';
import { useNetworkGet } from '../../network';
import { useRefresh } from '../../context/RefreshContext';
import { capitalize } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import ChartLoadingIcon from '../ChartLoadingIcon';
import { useApexChartExport } from '../../tools';

export default function BoxPlot(props: BoxPlotProps) {
  const [chartData, setChartData] = useState<QuartilesData>([1, 2, 3, 14, 57000]);
  const refresh = useRefresh();
  const queryKey = props.route + 'Boxplot';

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/quartiles`,
    queryKey,
    (data: QuartilesData) => {
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
      text: `C3: ${capitalize(props.xLabel)} dist.`,
      offsetX: 5,
    },
    tooltip: {
      shared: true,
      intersect: false,
      fixed: {
        enabled: true,
        position: 'bottomLeft',
        offsetY: -100,
        offsetX: 5,
      },
    },
    chart: {
      toolbar: {
        tools: {
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
        ...useApexChartExport('boxplot', props.route),
      },
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
    },
  };

  // Without this the plot is not showing and the window has to be manually resized to show it
  window.dispatchEvent(new Event('resize'));

  return (
    <ChartLoadingIcon isFetching={isFetching} className={'boxplot'}>
      <ReactApexChart
        options={options}
        series={series}
        type="boxPlot"
        height={'530px'}
        width={'180px'}
      />
    </ChartLoadingIcon>
  );
}
