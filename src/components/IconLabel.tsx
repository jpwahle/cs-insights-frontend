import { Stack } from '@mui/material';
import React from 'react';
import { IconLabelProps } from '../types';

export default function IconLabel(props: IconLabelProps) {
  return (
    <Stack direction="row" alignItems="center">
      {<props.icon />}
      <div>
        <b>{props.label}</b>
      </div>
    </Stack>
  );
}
