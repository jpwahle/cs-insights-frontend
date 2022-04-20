import React from 'react';
import '../App.css';
import { Button } from '@mui/material';
import { getData } from '../network';
import BarChart from '../charts/BarChart';

import Grid from '../charts/Grid';
import { GraphsProps, PaperStats } from '../types';

function Graphs(props: GraphsProps) {
  function handleFetchClick() {
    // TODO parallelize
    getData('fe/papers/stats').then((data: PaperStats) => {
      props.setLabels(data.timeData.years);
      if ('cites' in data.timeData) {
        props.setValues(data.timeData.cites);
      }
    });
    getData('fe/papers/paged?page=0&pageSize=100').then((data) => {
      props.setRows(data.rows);
      props.setRowCount(data.rowCount);

      // props.setLabels(data.timeData.years);
      // if ('cites' in data.timeData) {
      //   props.setValues(data.timeData.cites);
      // }
    });
  }

  return (
    <div className="graphs">
      <Button variant="contained" onClick={() => handleFetchClick()}>
        Fetch Data
      </Button>

      <BarChart labels={props.labels} values={props.values} />
      <Grid
        view={'papers'}
        rowCount={props.rowCount}
        setRowCount={props.setRowCount}
        rows={props.rows}
        setRows={props.setRows}
      />
    </div>
  );
}

export default Graphs;
