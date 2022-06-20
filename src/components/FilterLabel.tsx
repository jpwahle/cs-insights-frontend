import { Stack, Tooltip } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import React from 'react';

export default function FilterLabel(props: { label: string; helpTooltip: string }) {
  return (
    <Stack direction={'row'} className={'filter-label'}>
      <div>{props.label}</div>
      <Tooltip title={props.helpTooltip}>
        <HelpOutline />
      </Tooltip>
    </Stack>
  );
}
