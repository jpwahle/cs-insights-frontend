import Frame from '../components/Frame';
import BarChart from '../charts/BarChart';
import React from 'react';
import Tools from '../components/Tools';
import Grid from '../charts/Grid';
import { GridCellParams } from '@mui/x-data-grid';
import { Link } from '@mui/material';

export default function Authors() {
  const columns = [
    { field: '_id' },
    { field: 'author', headerName: 'Author', width: 300, tooltip: true },
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
        <BarChart route="authors" yDimension="authors" title={'Authors per year'} />
        {/*<BarChart route="authors2" yDimension="venues" title={'Venues per year'} />*/}
        {/*<BarChart route="authors3" yDimension="venues" title={'Venues per year'} />*/}
        {/*<BarChart route="authors4" yDimension="venues" title={'Venues per year'} />*/}
        <Grid columns={columns} route={'authors'} />
        {/*<Grid columns={columns} route={'authors2'} />*/}
      </div>
    </Frame>
  );
}
