import React from 'react';
import '../App.css';
import {
  FilterMultipleObjectFetch,
  FilterMultipleStringFetch,
  FilterMultipleStringLocal,
  FilterSingleStringLocal,
} from './FilterAutocomplete';
import { Button, Stack } from '@mui/material';
import { AuthorFilter, VenueFilter } from '../types';
import { useFilter } from '../context/FilterContext';
import IconLabel from './IconLabel';
import { Delete, FilterAlt } from '@mui/icons-material';
import FilterRange from './FilterRange';
import { NA } from '../consts';

export default function Sidebar() {
  const filter = useFilter();

  function clearFilters() {
    filter.setFilter({
      yearStart: '',
      yearEnd: '',
      citationsMin: '',
      citationsMax: '',
      authors: [],
      venues: [],
      accessType: null,
      typesOfPaper: [],
      fieldsOfStudy: [],
      publishers: [],
      metric: filter.filter.metric,
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
      <FilterRange
        label={'Year of publication'}
        helpTooltip={`Filter by the year of publication. Inclusive the given min and max values.
      Paper without a year of publication are aggregated into ${NA}, if no filter is selected.`}
        labelStart={'From'}
        labelEnd={'To'}
        valueStart={filter.filter.yearStart}
        valueEnd={filter.filter.yearEnd}
        setValueStart={(value) => filter.setFilter({ ...filter.filter, yearStart: value })}
        setValueEnd={(value) => filter.setFilter({ ...filter.filter, yearEnd: value })}
      />

      <FilterMultipleObjectFetch<AuthorFilter>
        route="authors"
        label="Authors"
        labelName="fullname"
        helpTooltip="Filter by the authors.
        The pattern will only match the beginning of the name or after a whitespace.
        3 characters minimum are required; case-insensitive.
        Special characters (ä, é, ì, ...) need to be removed without replacement."
        value={filter.filter.authors}
        setValue={(value) => filter.setFilter({ ...filter.filter, authors: value })}
      />
      <FilterMultipleObjectFetch<VenueFilter>
        label="Venues"
        route="venues"
        labelName="names"
        helpTooltip="Filter by the venue.
        Matches any position in the name of the venue.
        3 characters minimum required; case-sensitive."
        value={filter.filter.venues}
        setValue={(value) => filter.setFilter({ ...filter.filter, venues: value })}
      />
      <FilterMultipleStringLocal
        label="Types of papers"
        route="papers"
        labelName="typesOfPaper"
        helpTooltip="Filter by the type of paper (BibTeX type).
        Matches any position in the name of the type; case-insensitive."
        value={filter.filter.typesOfPaper}
        setValue={(value) => filter.setFilter({ ...filter.filter, typesOfPaper: value })}
      />
      <FilterMultipleStringLocal
        label="Fields of study"
        route="papers"
        labelName="fieldsOfStudy"
        helpTooltip={
          'Filter by the field of study. One paper can have multiple fields of study, but most papers are in the field "Computer Science". ' +
          'Matches any position in the field; case-insensitive.'
        }
        value={filter.filter.fieldsOfStudy}
        setValue={(value) => filter.setFilter({ ...filter.filter, fieldsOfStudy: value })}
      />
      <FilterMultipleStringFetch
        label="Publishers"
        route="papers"
        labelName="publisher"
        helpTooltip="Filter by the publisher.
        Most papers do not have a publisher.
        Matches any position in the name.
        3 characters minimum required; case-sensitive."
        value={filter.filter.publishers}
        setValue={(value) => filter.setFilter({ ...filter.filter, publishers: value })}
      />
      <FilterSingleStringLocal
        label="Access type"
        route="papers"
        labelName="accessType"
        helpTooltip="Filter by the access type.
        Select from the given options."
        value={filter.filter.accessType}
        setValue={(value) => filter.setFilter({ ...filter.filter, accessType: value })}
      />
      <FilterRange
        label={'Citations'}
        helpTooltip={`Filter by the amount of incoming citations per paper, before any aggregation. Inclusive the given min and max values.`}
        labelStart={'Min'}
        labelEnd={'Max'}
        valueStart={filter.filter.citationsMin}
        valueEnd={filter.filter.citationsMax}
        setValueStart={(value) => filter.setFilter({ ...filter.filter, citationsMin: value })}
        setValueEnd={(value) => filter.setFilter({ ...filter.filter, citationsMax: value })}
      />
    </Stack>
  );
}
