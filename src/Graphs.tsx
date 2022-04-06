//@ts-nocheck
import React, { useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import { getData } from './network';
import BarChart from './charts/BarChart';
import Grid from './charts/Grid';
import { Paper, PaperStats } from './types';
function Graphs() {
  const [rows, setRows] = useState<Paper[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [labels, setLabels] = useState<number[]>([]);

  function handleFetchClick() {
    getData('papers/stats').then((data: PaperStats) => {
      setRows(data.top);
      const mapping = data.time.reduce((res: any, obj: any) => {
        res[obj.year] = obj.cites;
        return res;
      }, {});
      setLabels(Object.keys(mapping));
      setValues(Object.values(mapping));
    });
  }
  return (
    <div className="Graphs">
      <Button variant="contained" onClick={() => handleFetchClick()}>
        Fetch Data
      </Button>

      <BarChart labels={labels} values={values} />
      <Grid rows={rows} />
    </div>
  );
}

export default Graphs;
