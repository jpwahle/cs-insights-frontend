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
import {
  ROUTE_AUTHORS,
  ROUTE_FIELDS_OF_STUDY,
  ROUTE_PUBLISHERS,
  ROUTE_TOPICS,
  ROUTE_TYPES_OF_PAPER,
  ROUTE_VENUES,
} from '../consts';
import { metrics } from '../tools';
import { ModelIdAutocomplete } from './ModelIdAutocomplete';

export default function Tools(props: { route: string }) {
  const refresh = useRefresh();
  const filter = useFilter();

  const handleChange = (event: SelectChangeEvent) => {
    filter.setFilter({ ...filter.filter, metric: event.target.value });
  };

  const metricSwitchRoutes = [
    ROUTE_AUTHORS,
    ROUTE_VENUES,
    ROUTE_TYPES_OF_PAPER,
    ROUTE_FIELDS_OF_STUDY,
    ROUTE_PUBLISHERS,
  ].map((route) => route.slice(1));

  return (
    <Stack direction="row" className="tools">
      <IconLabel label="B2: Tools" icon={Construction} />
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
      {metricSwitchRoutes.includes(props.route) ? (
        <FormControl>
          <InputLabel>Metric</InputLabel>
          <Select
            value={filter.filter.metric}
            label="Metric"
            onChange={handleChange}
            size={'small'}
          >
            {metrics.map((metric) => (
              <MenuItem key={metric.value} value={metric.value}>
                {metric.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
      {props.route === ROUTE_TOPICS.slice(1) ? <ModelIdAutocomplete /> : null}
    </Stack>
  );
}
