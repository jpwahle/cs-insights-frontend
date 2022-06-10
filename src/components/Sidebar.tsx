import React from 'react';
import '../App.css';
import {
  FilterMultipleObjectFetch,
  FilterMultipleStringFetch,
  FilterMultipleStringLocal,
  FilterSingleStringLocal,
} from './FilterCategorical';
import { Button, Stack } from '@mui/material';
import FilterTextField from './FilterTextfield';
import { AuthorFilter, VenueFilter } from '../types';
import { useFilter } from '../context/FilterContext';
import IconLabel from './IconLabel';
import { Delete, FilterAlt } from '@mui/icons-material';

export default function Sidebar() {
  const filter = useFilter();

  function clearFilters() {
    filter.setFilter({
      yearStart: '',
      yearEnd: '',
      authors: [],
      venues: [],
      accessType: null,
      typesOfPaper: [],
      fieldsOfStudy: [],
      publishers: [],
    });
  }

  return (
    <Stack className="sidebar">
      <Stack direction="row" className="filter-header">
        <IconLabel label="Filters" icon={FilterAlt} />
        <Button variant="outlined" startIcon={<Delete />} onClick={() => clearFilters()}>
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
      <FilterMultipleObjectFetch<AuthorFilter>
        route="authors"
        label="fullname"
        tooltip="Only matches the beginning or after whitespaces; min. 3 characters; case-insensitive; special characters (ä, é, ì, ...) need to be removed without replacement"
        value={filter.filter.authors}
        setValue={(value) => filter.setFilter({ ...filter.filter, authors: value })}
      />
      <div className="filter-label">Venues</div>
      <FilterMultipleObjectFetch<VenueFilter>
        route="venues"
        label="names"
        tooltip="Matches any position in the name; min. 3 characters; case-sensitive"
        value={filter.filter.venues}
        setValue={(value) => filter.setFilter({ ...filter.filter, venues: value })}
      />
      <div className="filter-label">Types of paper</div>
      <FilterMultipleStringLocal
        route="papers"
        label="typesOfPaper"
        tooltip="Matches any position in the name; case-insensitive"
        value={filter.filter.typesOfPaper}
        setValue={(value) => filter.setFilter({ ...filter.filter, typesOfPaper: value })}
      />
      <div className="filter-label">Fields of study</div>
      <FilterMultipleStringLocal
        route="papers"
        label="fieldsOfStudy"
        tooltip="Matches any position in the name; case-insensitive"
        value={filter.filter.fieldsOfStudy}
        setValue={(value) => filter.setFilter({ ...filter.filter, fieldsOfStudy: value })}
      />
      <div className="filter-label">Publishers</div>
      <FilterMultipleStringFetch
        route="papers"
        label="publisher"
        tooltip="Matches any position in the name; min. 3 characters; case-sensitive"
        value={filter.filter.publishers}
        setValue={(value) => filter.setFilter({ ...filter.filter, publishers: value })}
      />
      <div className="filter-label">Access type</div>
      <FilterSingleStringLocal
        route="papers"
        label="accessType"
        tooltip="Select from options"
        value={filter.filter.accessType}
        setValue={(value) => filter.setFilter({ ...filter.filter, accessType: value })}
      />
    </Stack>
  );
}
