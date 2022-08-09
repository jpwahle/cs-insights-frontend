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
  const [chartData, setChartData] = useState<QuartilesData>([]);
  const [chartDataLog, setChartDataLog] = useState<QuartilesData>([]); // TODO remove when boxplot log scale is fixed
  const refresh = useRefresh();
  const queryKey = props.route + 'Boxplot';

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/quartiles`,
    queryKey,
    (data: QuartilesData) => {
      setChartDataLog(data.map((value) => (value === 0 ? 0 : Math.log10(value))));
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
          y: chartDataLog,
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
      // TODO remove "custom" when boxplot log scale is fixed
      custom: () =>
        '<div style="padding-left: 7px; padding-right: 7px; padding-top: 3px; padding-bottom: 3px; line-height: 1.6">Maximum: <b>' +
        chartData[4] +
        '</b><br>Q3: <b>' +
        chartData[3] +
        '</b></><br>Median: <b>' +
        chartData[2] +
        '</b><br>Q1: <b>' +
        chartData[1] +
        '</b><br>Minimum: <b>' +
        chartData[0] +
        '</b></div>',
      shared: true,
      intersect: false,
      fixed: {
        enabled: true,
        position: 'topLeft',
        offsetX: 10,
        offsetY: 60,
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
    yaxis: {
      labels: {
        formatter: (value) => '' + Math.pow(10, value),
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
