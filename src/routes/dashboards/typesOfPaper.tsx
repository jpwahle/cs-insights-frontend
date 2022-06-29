import React from 'react';
import FrameWithGraphs from '../../components/FrameWithGraphs';
import { GridCellParams } from '@mui/x-data-grid';
import { capitalize } from '@mui/material';
import { GRID_DECIMAL_PLACES } from '../../consts';

export default function TypesOfPaper() {
  const columns = [
    { field: '_id' },
    {
      field: 'typeOfPaper',
      headerName: 'Type of paper',
      width: 200,
      valueGetter: (params: GridCellParams) => {
        return capitalize(params.value);
      },
    },
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
  ];

  return <FrameWithGraphs route={'types'} columns={columns} yDimension={'types of paper'} />;
}
