//@ts-nocheck
/* eslint-disable */
import React, { useState } from 'react';
import '../App.css';
import { Button } from '@mui/material';
import { getData } from '../network';
import BarChart from '../charts/BarChart';

import Grid from '../charts/Grid';
import { PaperStats } from '../types';

function Graphs(props) {
  function handleFetchClick() {
    getData('fe/papers/stats').then((data: PaperStats) => {
      props.setLabels(data.timeData.years);
      if ('cites' in data.timeData) {
        props.setValues(data.timeData.cites);
      }
    });
  }

  return (
    <div className="graphs">
      <Button variant="contained" onClick={() => handleFetchClick()}>
        Fetch Data
      </Button>

      <BarChart labels={props.labels} values={props.values} />
      <Grid view={'papers'} />
    </div>
  );
}

export default Graphs;
