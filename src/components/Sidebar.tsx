//@ts-nocheck
/*eslint-disable*/
import React from 'react';
import '../App.css';
import FilterCategorical from './FilterCategorical';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import FilterTextfield from './FilterTextfield';
import { getData } from '../network';
import { PaperStats } from '../types';

export default function Sidebar(props) {
  function handleApplyFiltersClick(yearStart, yearEnd, author, venue) {
    console.log(yearStart, yearEnd, author, venue);
    const route = `fe/papers/stats?yearStart=${yearStart}&yearEnd=${yearEnd}&author=${author._id}`; //&venue=${venue._id} FIXME
    console.log(route);
    getData(route).then((data: PaperStats) => {
      props.setLabels(data.timeData.years);
      if ('cites' in data.timeData) {
        props.setValues(data.timeData.cites);
      }
    });
  }

  return (
    <Stack className="sidebar">
      <Stack direction="row" className="filter-header">
        <b>Filters</b>
        <Button
          onClick={() =>
            handleApplyFiltersClick(props.yearStart, props.yearEnd, props.author, props.venue)
          }
        >
          Apply Filters
        </Button>
      </Stack>

      <div className="filter-label">Year of publication</div>
      <Stack direction="row" className="filter-year">
        <FilterTextfield label="From" value={props.yearStart} setValue={props.setYearStart} />
        <div className="filter-year-minus">-</div>
        <FilterTextfield label="To" value={props.yearEnd} setValue={props.setYearEnd} />
      </Stack>

      <div className="filter-label">Author</div>
      <FilterCategorical
        route="authors"
        label="fullname"
        value={props.author}
        setValue={props.setAuthor}
      />

      <div className="filter-label">Venue</div>
      <FilterCategorical
        route="venues"
        label="name"
        value={props.venue}
        setValue={props.setVenue}
      />
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
