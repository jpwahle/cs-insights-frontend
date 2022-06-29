import React from 'react';
import { GridCellParams } from '@mui/x-data-grid';
import { Link } from '@mui/material';
import FrameWithGraphs from '../../components/FrameWithGraphs';

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
    {
      field: 'inCitationsCount',
      headerName: 'Citations',
      width: 110,
      type: 'number',
    },
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

  return <FrameWithGraphs route={'papers'} columns={columns} yDimension={'papers'} />;
}
