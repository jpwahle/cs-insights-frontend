import Frame from './Frame';
import Tools from './Tools';
import { Stack } from '@mui/material';
import BarChart from './charts/BarChart';
import Grid from './charts/Grid';
import { GraphsProps } from '../types';
import BoxPlot from './charts/BoxPlot';
import React from 'react';
import TreeMap from './charts/TreeMap';

export default function FrameWithGraphs(props: GraphsProps) {
  return (
    <Frame>
      <Tools />
      <Stack direction={'column'} className="graphs">
        <Stack direction={'row'}>
          <Stack direction={'column'} width={'100%'}>
            <BarChart route={props.route} yDimension={props.yDimension} />
            <Grid columns={props.columns} route={props.route} />
          </Stack>
          <BoxPlot xLabel={'citations'} route={props.route} />
        </Stack>
        <TreeMap yDimension={'citations'} route={props.route} />
      </Stack>
    </Frame>
  );
}
