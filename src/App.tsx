import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Categories from './Categories';
import Graphs from './Graphs';
import Header from './Header';
import { Stack } from '@mui/material';

function App() {
  return (
    <Stack className="App">
      <Header />
      <Stack direction="row" className="stack">
        <Sidebar />
        <Stack className="stack">
          <Categories />
          <Graphs />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
