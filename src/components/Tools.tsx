import React from 'react';
import '../App.css';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import IconLabel from './IconLabel';
import { useRefresh } from '../context/RefreshContext';
import { Construction } from '@mui/icons-material';
import { useFilter } from '../context/FilterContext';
import _ from 'lodash';
import { ROUTE_CITATIONS, ROUTE_PAPERS, ROUTE_TOPICS } from '../consts';

export const metrics = {
  papers: { label: '#Papers', value: 'papersCount' },
  citations: { label: '#Citations', value: 'inCitationsCount' },
};

export function mapMetric(metric: string): string {
  if (metric === metrics.papers.value) {
    return metrics.citations.label;
  } else if (metric === metrics.citations.value) {
    return metrics.citations.label;
  }
  return '';
}

export default function Tools(props: { route: string }) {
  const refresh = useRefresh();
  const filter = useFilter();

  const handleChange = (event: SelectChangeEvent) => {
    filter.setFilter({ ...filter.filter, metric: event.target.value });
  };

  const routeExceptions = [ROUTE_PAPERS, ROUTE_CITATIONS, ROUTE_TOPICS].map((route) =>
    route.slice(1)
  );

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
      {_.isEqual(filter.filter, filter.oldFilter) ? (
        <div />
      ) : (
        <Typography style={{ color: 'red' }}>There are unapplied filters/changes!</Typography>
      )}
      {routeExceptions.includes(props.route) ? null : (
        <FormControl>
          <InputLabel>Metric</InputLabel>
          <Select
            value={filter.filter.metric}
            label="Metric"
            onChange={handleChange}
            size={'small'}
          >
            <MenuItem value={metrics.papers.value}>{metrics.papers.label}</MenuItem>
            <MenuItem value={metrics.citations.value}>{metrics.citations.label}</MenuItem>
          </Select>
        </FormControl>
      )}
    </Stack>
  );
}
