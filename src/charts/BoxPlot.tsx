import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BoxPlotProps, QuartilesData } from '../types';
import { useNetworkGet } from '../network';
import { useRefresh } from '../context/RefreshContext';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import { ApexOptions } from 'apexcharts';

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
          x: 'Citations',
          y: chartData,
        },
      ],
    },
  ];

  const options: ApexOptions = {
    // title: {
    //   text: props.title,
    //   align: 'left',
    // },
    tooltip: {
      shared: false,
      intersect: true,
    },
  };

  // Without this the plot is not showing and the window has to be manually resized to show it
  window.dispatchEvent(new Event('resize'));

  return (
    <div>
      <Box sx={{ position: 'relative' }}>
        <ReactApexChart options={options} series={series} type="boxPlot" height={550} width={180} />
        {isFetching ? (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              top: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : null}
      </Box>
    </div>
  );
}
