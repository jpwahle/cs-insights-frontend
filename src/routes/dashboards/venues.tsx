import React from 'react';
import { GridCellParams } from '@mui/x-data-grid';
import { Link } from '@mui/material';
import FrameWithGraphs from '../../components/FrameWithGraphs';
import { GRID_DECIMAL_PLACES } from '../../consts';

export default function Venues() {
  const columns = [
    { field: '_id' },
    { field: 'venue', headerName: 'Venue', width: 400, tooltip: true },
    { field: 'yearPublishedFirst', headerName: 'First', width: 80 },
    { field: 'yearPublishedLast', headerName: 'Last', width: 80 },
    { field: 'papersCount', headerName: 'Papers', type: 'number' },
    { field: 'inCitationsCount', headerName: 'Citations', width: 110, type: 'number' },
    {
      field: 'inCitationsPerPaper',
      headerName: 'Citations/Paper',
      width: 150,
      type: 'number',
      valueGetter: (params: GridCellParams) => {
        return params.value.toFixed(GRID_DECIMAL_PLACES);
      },
    },
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

  return <FrameWithGraphs route={'venues'} columns={columns} barChartYDimension={'venues'} />;
}
