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
    getData('papers/stats').then((data: PaperStats) => {
      const mapping = data.timeData.reduce((res: any, obj: any) => {
        res[obj.year] = obj.cites;
        return res;
      }, {});
      setLabels(Object.keys(mapping));
      setValues(Object.values(mapping));
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
