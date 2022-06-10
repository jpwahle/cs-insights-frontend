import React from 'react';
import '../App.css';
import { Button, Stack } from '@mui/material';
import IconLabel from './IconLabel';
import { useRefresh } from '../context/RefreshContext';
import { Construction } from '@mui/icons-material';

export default function Tools() {
  const refresh = useRefresh();
  return (
    <Stack direction="row" className="categories">
      <IconLabel label="Tools" icon={Construction} />
      <Button variant="contained" onClick={() => refresh.refresh()}>
        Fetch Data/Apply Filters
      </Button>
    </Stack>
  );
}
