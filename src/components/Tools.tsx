import React from 'react';
import '../App.css';
import { Button, Stack, Typography } from '@mui/material';
import IconLabel from './IconLabel';
import { useRefresh } from '../context/RefreshContext';
import { Construction } from '@mui/icons-material';
import { useFilter } from '../context/FilterContext';
import _ from 'lodash';

export default function Tools() {
  const refresh = useRefresh();
  const filter = useFilter();
  return (
    <Stack direction="row" className="tools">
      <IconLabel label="Tools" icon={Construction} />
      <Button
        variant="contained"
        onClick={() => {
          filter.setOldFilter(filter.filter);
          refresh.refresh();
        }}
      >
        Fetch Data/Apply Filters
      </Button>
      {_.isEqual(filter.filter, filter.oldFilter) ? null : (
        <Typography style={{ color: 'red' }}>There are unapplied filters!</Typography>
      )}
    </Stack>
  );
}
