import React from 'react';
import FrameWithGraphs from '../components/FrameWithGraphs';

export default function Publisher() {
  const columns = [
    { field: '_id' },
    { field: 'publisher', headerName: 'Publisher', width: 400, tooltip: true },
    { field: 'yearPublishedFirst', headerName: 'First', width: 80 },
    { field: 'yearPublishedLast', headerName: 'Last', width: 80 },
    { field: 'papersCount', headerName: 'Papers' },
    { field: 'inCitationsCount', headerName: 'Citations', width: 110 },
    { field: 'inCitationsPerPaper', headerName: 'Citations/Paper', width: 150 },
  ];

  return <FrameWithGraphs route={'publishers'} columns={columns} yDimension={'publishers'} />;
}
