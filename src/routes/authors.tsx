import React from 'react';
import { GridCellParams } from '@mui/x-data-grid';
import { Link } from '@mui/material';
import FrameWithGraphs from '../components/FrameWithGraphs';

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

  return <FrameWithGraphs route={'authors'} columns={columns} yDimension={'authors'} />;
}
