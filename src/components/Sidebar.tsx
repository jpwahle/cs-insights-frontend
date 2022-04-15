import React from 'react';
import '../App.css';
import FilterCategorical from './FilterCategorical';
import { Button, Stack } from '@mui/material';
import FilterTextfield from './FilterTextfield';
import { getData } from '../network';
import { SidebarProps, PaperStats, VenueFilter, AuthorFilter } from '../types';

export default function Sidebar(props: SidebarProps) {
  function applyFilters() {
    let route = `fe/papers/stats?yearStart=${props.yearStart}&yearEnd=${props.yearEnd}`;
    if (props.author) {
      route += `&author=${props.author._id}`;
    }
    if (props.venue) {
      route += `&venue=${props.venue._id}`;
    }
    console.log(route);
    getData(route).then((data: PaperStats) => {
      props.setLabels(data.timeData.years);
      if ('cites' in data.timeData) {
        props.setValues(data.timeData.cites);
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
