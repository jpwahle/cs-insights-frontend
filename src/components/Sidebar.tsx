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
    filter.setFilter({
      yearStart: '',
      yearEnd: '',
      authors: [],
      venues: [],
      accessType: null,
      fieldsOfStudy: [],
    });
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

      <div className="filter-label">Authors</div>
      <FilterCategorical<AuthorFilter>
        route="authors"
        label="fullname"
        tooltip="Only matches the beginning or after whitespaces; min. 3 characters; case-insensitive; special characters (ä, é, ì, ...) need to be removed without replacement"
        value={filter.filter.authors}
        setValue={(value) => filter.setFilter({ ...filter.filter, authors: value })}
      />
      <div className="filter-label">Venues</div>
      <FilterCategorical<VenueFilter>
        route="venues"
        label="names"
        tooltip="Matches any position in the name; case-sensitive"
        value={filter.filter.venues}
        setValue={(value) => filter.setFilter({ ...filter.filter, venues: value })}
      />
    </Stack>
  );
}
