import Frame from '../components/Frame';
import React from 'react';
import BarChart from '../charts/BarChart';
import Tools from '../components/Tools';
import { Venue } from '../types';
import Grid from '../charts/Grid';
import { GridCellParams } from '@mui/x-data-grid';
import { Link } from '@mui/material';

export default function Venues() {
  const columns = [
    { field: '_id' },
    { field: 'venue', headerName: 'Venue', width: 400, tooltip: true },
    { field: 'yearPublishedFirst', headerName: 'First', width: 80 },
    { field: 'yearPublishedLast', headerName: 'Last', width: 80 },
    { field: 'papersCount', headerName: 'Papers' },
    { field: 'inCitationsCount', headerName: 'Citations', width: 110 },
    { field: 'inCitationsPerPaper', headerName: 'Citations/Paper', width: 150 },
    {
      field: 'link',
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
        <BarChart route="venues" yDimension="venues" title={'Venues per year'} />
        {/*<BarChart route="venues2" yDimension="venues" title={'Venues per year'} />*/}
        {/*<BarChart route="venues3" yDimension="venues" title={'Venues per year'} />*/}
        <Grid<Venue> columns={columns} route={'venues'} />
        {/*<Grid<Venue> columns={columns} route={'venues2'} />*/}
      </div>
    </Frame>
  );
}
