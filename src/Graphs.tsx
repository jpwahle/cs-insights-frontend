import React, { useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import { getData } from './network';
import BarChart from './charts/BarChart';
import Grid from './charts/Grid';
import { PaperStats } from './types';

function Graphs() {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  function handleFetchClick() {
    getData('fe/papers/stats').then((data: PaperStats) => {
      setLabels(data.timeData.years);
      if ('cites' in data.timeData) {
        setValues(data.timeData.cites);
      }
    });
  }

  return (
    <div className="graphs">
      <Button variant="contained" onClick={() => handleFetchClick()}>
        Fetch Data
      </Button>

      <BarChart labels={labels} values={values} />
      <Grid view={'papers'} />
    </div>
  );
}

export default Graphs;
