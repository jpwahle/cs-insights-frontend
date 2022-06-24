import Frame from './Frame';
import Tools from './Tools';
import { capitalize, Stack } from '@mui/material';
import BarChart from '../charts/BarChart';
import Grid from '../charts/Grid';
import { GraphsProps } from '../types';
import BoxPlot from '../charts/BoxPlot';
import React from 'react';

export default function FrameWithGraphs(props: GraphsProps) {
  return (
    <Frame>
      <Tools />
      <div className="graphs">
        <Stack direction={'row'}>
          <Stack direction={'column'} width={'100%'}>
            <BarChart
              route={props.route}
              yDimension={props.yDimension}
              title={`${capitalize(props.yDimension)} per year`}
            />
            <Grid columns={props.columns} route={props.route} />
          </Stack>
          <BoxPlot title={'Citations'} yDimension={'citations'} route={props.route} />
        </Stack>
      </div>
    </Frame>
  );
}
