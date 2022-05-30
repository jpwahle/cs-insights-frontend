import Tools from '../components/Tools';
import React from 'react';
import { Paper } from '../types';
import Grid from '../charts/Grid';
import Frame from '../components/Frame';
import BarChart from '../charts/BarChart';

export default function Papers() {
  const columns = [
    { field: '_id' },
    { field: 'title', headerName: 'Title', width: 400 },
    { field: 'yearPublished', headerName: 'Year', width: 80 },
    { field: 'authors', headerName: 'Authors', width: 300 },
    { field: 'venue', headerName: 'Venue', width: 200 },
    { field: 'inCitationsCount', headerName: 'Citations' },
  ];

  return (
    <Frame>
      <Tools />
      <div className="graphs">
        <BarChart route="papers" yDimension="citations" />
        <Grid<Paper> columns={columns} route={'papers'} />
      </div>
    </Frame>
  );
}
