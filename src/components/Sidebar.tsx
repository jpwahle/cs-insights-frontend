import React, { useContext } from 'react';
import '../App.css';
import FilterCategorical from './FilterCategorical';
import { Button, Stack } from '@mui/material';
import FilterTextfield from './FilterTextfield';
import { getData } from '../network';
import { AuthorFilter, PaperStats, SidebarProps, VenueFilter } from '../types';
import { SnackbarContext } from '../context/SnackbarContextProvider';

export default function Sidebar(props: SidebarProps) {
  const setSnack = useContext(SnackbarContext);

  function applyFilters() {
    let filterParameter = '';
    if (props.yearStart) {
      filterParameter += `yearStart=${props.yearStart}&`;
    }
    if (props.yearEnd) {
      filterParameter += `yearEnd=${props.yearEnd}&`;
    }
    if (props.author) {
      filterParameter += `author=${props.author._id}&`;
    }
    if (props.venue) {
      filterParameter += `venue=${props.venue._id}&`;
    }
    getData('fe/papers/stats?' + filterParameter).then((data: PaperStats | string) => {
      if (typeof data === 'string') {
        setSnack(data);
      } else {
        props.setLabels(data.timeData.years);
        if ('cites' in data.timeData) {
          props.setValues(data.timeData.cites);
        }
      }
    });
    //todo flexible page/pageSize
    getData('fe/papers/paged?page=0&pageSize=100&' + filterParameter).then((data) => {
      if (typeof data === 'string') {
        setSnack(data);
      } else {
        props.setRows(data.rows);
        props.setRowCount(data.rowCount);
      }
    });
  }

  function clearFilters() {
    props.setYearStart('');
    props.setYearEnd('');
    props.setAuthor(null);
    props.setVenue(null);
  }

  return (
    <Stack className="sidebar">
      <Stack direction="row" className="filter-header">
        <b>Filters</b>
        <Button onClick={() => applyFilters()}>Apply Filters</Button>
      </Stack>

      <div className="filter-label">Year of publication</div>
      <Stack direction="row" className="filter-year">
        <FilterTextfield label="From" value={props.yearStart} setValue={props.setYearStart} />
        <div className="filter-year-minus">-</div>
        <FilterTextfield label="To" value={props.yearEnd} setValue={props.setYearEnd} />
      </Stack>

      <div className="filter-label">Author</div>
      <FilterCategorical<AuthorFilter>
        route="authors"
        label="fullname"
        value={props.author}
        setValue={props.setAuthor}
      />

      <div className="filter-label">Venue</div>
      <FilterCategorical<VenueFilter>
        route="venues"
        label="names"
        value={props.venue}
        setValue={props.setVenue}
      />
      <Button onClick={() => clearFilters()}>Clear Filters</Button>
      {/*No functionality (might break):*/}
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
