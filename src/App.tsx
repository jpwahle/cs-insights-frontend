// @ts-nocheck
import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Selection from './Selection';
import Graphs from './Graphs';
import Header from './Header';
import { Stack } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Header />
      <Stack direction="row">
        <Sidebar />
        <div>
          <Selection />
          <Graphs />
        </div>
      </Stack>
    </div>
  );
}

export default App;
