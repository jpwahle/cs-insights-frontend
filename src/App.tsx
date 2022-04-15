//@ts-nocheck
import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Categories from './components/Categories';
import Graphs from './components/Graphs';
import Header from './components/Header';
import { Stack } from '@mui/material';

function App() {
  const [yearStart, setYearStart] = useState(undefined);
  const [yearEnd, setYearEnd] = useState(undefined);
  const [author, setAuthor] = useState(null); //FIXME undefined considered uncontrolled
  const [venue, setVenue] = useState(null); //FIXME undefined considered uncontrolled

  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  return (
    <Stack className="App">
      <Header />
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
        />
        <Stack className="stack">
          <Categories />
          <Graphs labels={labels} setLabels={setLabels} values={values} setValues={setValues} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
