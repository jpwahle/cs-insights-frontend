import { Stack } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Categories from '../components/Categories';
import Graphs from '../components/Graphs';
import React, { useState } from 'react';
import { AuthorFilter, Paper, VenueFilter } from '../types';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

export default function Papers() {
  const [yearStart, setYearStart] = useState<string>('');
  const [yearEnd, setYearEnd] = useState<string>('');
  const [author, setAuthor] = useState<AuthorFilter | null>(null);
  const [venue, setVenue] = useState<VenueFilter | null>(null);

  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  const [rowCount, setRowCount] = React.useState<number>(0);
  const [rows, setRows] = React.useState<Paper[]>([]);

  const columns = [
    { field: '_id' },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'year', headerName: 'Year' },
    { field: 'authors', headerName: 'Authors', width: 200 },
    { field: 'venues', headerName: 'Venue', width: 200 },
    { field: 'cites', headerName: 'Citations' },
  ];

  return (
    <Stack className="Main">
      {/*<Header />*/}
      <ResponsiveAppBar />
      <Stack direction="row" className="stack">
        <Sidebar
          yearStart={yearStart}
          setYearStart={setYearStart}
          yearEnd={yearEnd}
          setYearEnd={setYearEnd}
          author={author}
          setAuthor={setAuthor}
          venue={venue}
          setVenue={setVenue}
          labels={labels}
          setLabels={setLabels}
          values={values}
          setValues={setValues}
          rowCount={rowCount}
          setRowCount={setRowCount}
          rows={rows}
          setRows={setRows}
        />
        <Stack className="stack">
          <Categories />
          <Graphs
            labels={labels}
            setLabels={setLabels}
            values={values}
            setValues={setValues}
            rowCount={rowCount}
            setRowCount={setRowCount}
            rows={rows}
            setRows={setRows}
            columns={columns}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
