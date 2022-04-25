import React from 'react';
import '../App.css';
import { TextField } from '@mui/material';
import { FilterYear } from '../types';

export default function FilterTextfield(props: FilterYear) {
  return (
    <TextField
      label={props.label}
      size="small"
      className="filter-textfield"
      inputProps={{
        size: 5,
      }}
      value={props.value}
      onChange={(event) => props.setValue(event.target.value)}
    />
  );
}
