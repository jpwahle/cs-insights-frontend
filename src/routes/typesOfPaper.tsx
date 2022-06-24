import React from 'react';
import FrameWithGraphs from '../components/FrameWithGraphs';
import { GridCellParams } from '@mui/x-data-grid';
import { capitalize } from '@mui/material';

export default function TypesOfPaper() {
  const columns = [
    { field: '_id' },
    {
      field: 'typeOfPaper',
      headerName: 'Type of paper',
      width: 400,
      tooltip: true,
      valueGetter: (params: GridCellParams) => {
        return capitalize(params.value);
      },
    },
    { field: 'yearPublishedFirst', headerName: 'First', width: 80 },
    { field: 'yearPublishedLast', headerName: 'Last', width: 80 },
    { field: 'papersCount', headerName: 'Papers' },
    { field: 'inCitationsCount', headerName: 'Citations', width: 110 },
    { field: 'inCitationsPerPaper', headerName: 'Citations/Paper', width: 150 },
  ];

  return <FrameWithGraphs route={'types'} columns={columns} yDimension={'types of paper'} />;
}
