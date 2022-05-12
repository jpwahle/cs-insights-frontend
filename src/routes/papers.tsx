import Tools from '../components/Tools';
import React from 'react';
import { Paper } from '../types';
import Grid from '../charts/Grid';
import Frame from '../components/Frame';
import BarChart from '../charts/BarChart';

export default function Papers() {
  const columns = [
    { field: '_id' },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'year', headerName: 'Year' },
    { field: 'authors', headerName: 'Authors', width: 200 },
    { field: 'venues', headerName: 'Venue', width: 200 },
    { field: 'cites', headerName: 'Citations' },
  ];

  return (
    <Frame>
      <Tools />
      <div className="graphs">
        <BarChart route="papers" yLabel="citations" />
        <Grid<Paper> columns={columns} route={'papers'} />
      </div>
    </Frame>
  );
}
