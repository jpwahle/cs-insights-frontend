import Tools from '../components/Tools';
import React from 'react';
import { Paper } from '../types';
import Grid from '../charts/Grid';
import Frame from '../components/Frame';
import BarChart from '../charts/BarChart';
import { GridCellParams } from '@mui/x-data-grid';
import { Link } from '@mui/material';

export default function Papers() {
  const columns = [
    { field: '_id' },
    { field: 'title', headerName: 'Title', width: 400, tooltip: true },
    { field: 'yearPublished', headerName: 'Year', width: 80 },
    {
      field: 'authors',
      headerName: 'Authors',
      width: 300,
      tooltip: true,
      valueGetter: (params: GridCellParams) => {
        return params.value.join(', ');
      },
    },
    { field: 'venue', headerName: 'Venue', width: 200, tooltip: true },
    { field: 'inCitationsCount', headerName: 'Citations', width: 110 },
    {
      field: 'pdfUrl',
      headerName: 'Link',
      width: 80,
      renderCell: (params: GridCellParams) =>
        params.value ? (
          <Link href={params.value} target="_blank" rel="noopener noreferrer" fontWeight="bold">
            Link
          </Link>
        ) : null,
    },
  ];

  return (
    <Frame>
      <Tools />
      <div className="graphs">
        <BarChart route="papers" yDimension="papers" title={'Papers per year'} />
        <Grid<Paper> columns={columns} route={'papers'} />
      </div>
    </Frame>
  );
}
