import { Stack } from '@mui/material';
import { IconLabelProps } from '../types';

export default function IconLabel(props: IconLabelProps) {
  return (
    <Stack direction="row" alignItems="center">
      {<props.icon />}
      <div style={{ fontWeight: 'bold' }}>{props.label}</div>
    </Stack>
  );
}
