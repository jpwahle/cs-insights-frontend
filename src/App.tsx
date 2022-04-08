//@ts-nocheck
import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Selection from './Selection';
import Graphs from './Graphs';
import Header from './Header';
// import { Stack } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Header />
      <div direction="row" className="stack1">
        <Sidebar />
        <div className="stack2">
          <Selection />
          <Graphs />
        </div>
      </div>
    </div>
  );
}

export default App;
