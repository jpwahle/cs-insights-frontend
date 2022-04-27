import React from 'react';
import '../App.css';
import FilterCategorical from './FilterCategorical';
import { Button, Stack } from '@mui/material';
import FilterTextField from './FilterTextfield';
import { AuthorFilter, VenueFilter } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFilter } from '../context/FilterContext';
import IconLabel from './IconLabel';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function Sidebar() {
  const filter = useFilter();

  function clearFilters() {
    filter.setFilter({ yearStart: '', yearEnd: '', author: null, venue: null });
  }

  return (
    <Stack className="sidebar">
      <Stack direction="row" className="filter-header">
        <IconLabel label="Filters" icon={FilterAltIcon} />
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => clearFilters()}>
          Clear Filters
        </Button>
      </Stack>
      <div className="filter-label">Year of publication</div>
      <Stack direction="row" className="filter-year">
        <FilterTextField
          label="From"
          value={filter.filter.yearStart}
          setValue={(value) => filter.setFilter({ ...filter.filter, yearStart: value })}
        />
        <div className="filter-year-minus">-</div>
        <FilterTextField
          label="To"
          value={filter.filter.yearEnd}
          setValue={(value) => filter.setFilter({ ...filter.filter, yearEnd: value })}
        />
      </Stack>

      <div className="filter-label">Author</div>
      <FilterCategorical<AuthorFilter>
        route="authors"
        label="fullname"
        value={filter.filter.author}
        setValue={(value) => filter.setFilter({ ...filter.filter, author: value })}
      />

      <div className="filter-label">Venue</div>
      <FilterCategorical<VenueFilter>
        route="venues"
        label="names"
        value={filter.filter.venue}
        setValue={(value) => filter.setFilter({ ...filter.filter, venue: value })}
      />

      {/*No functionality (might break): TODO*/}
      {/*<div className="filter-label">Affiliations</div>*/}
      {/*<FilterCategorical route="affiliations" />*/}
      {/*<div className="filter-label">Access type</div>*/}
      {/*<FormGroup>*/}
      {/*  <FormControlLabel control={<Checkbox />} label="open" />*/}
      {/*  <FormControlLabel control={<Checkbox />} label="other" />*/}
      {/*</FormGroup>*/}
    </Stack>
  );
}
