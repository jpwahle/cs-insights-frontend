import Frame from './Frame';
import { Stack } from '@mui/material';
import BarChart from './charts/BarChart';
import Grid from './charts/Grid';
import { GraphsProps } from '../types';
import BoxPlot from './charts/BoxPlot';
import React from 'react';
import TreeMap from './charts/TreeMap';
import { useFilter } from '../context/FilterContext';
import Tools, { mapMetric } from './Tools';

export default function FrameWithGraphs(props: GraphsProps) {
  const filter = useFilter();
  const metric = mapMetric(filter.filter.metric);
  return (
    <Frame>
      <Tools route={props.route} />
      <Stack direction={'column'} className={'graphs'}>
        <Stack direction={'row'}>
          <Stack direction={'column'} width={'100%'}>
            <BarChart route={props.route} yDimension={props.barChartYDimension} />
            <Grid columns={props.columns} route={props.route} />
          </Stack>
          <BoxPlot xLabel={metric} route={props.route} />
        </Stack>
        <TreeMap yDimension={metric} route={props.route} />
      </Stack>
    </Frame>
  );
}
