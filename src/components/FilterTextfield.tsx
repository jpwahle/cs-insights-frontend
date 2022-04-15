//@ts-nocheck
/*eslint-disable*/
import React from 'react';
import '../App.css';
import { TextField } from '@mui/material';

export default function FilterTextfield(props) {
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
