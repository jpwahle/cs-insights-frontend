import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from './context/SnackbarContext';
import Login from './routes/login';
import Register from './routes/register';
import Papers from './routes/papers';
import Authors from './routes/authors';
import Home from './routes/home';
import Venues from './routes/venues';
import { FilterProvider } from './context/FilterContext';

export default function App() {
  return (
    <SnackbarProvider>
      <FilterProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="papers" element={<Papers />} />
            <Route path="authors" element={<Authors />} />
            <Route path="venues" element={<Venues />} />
          </Routes>
        </BrowserRouter>
      </FilterProvider>
    </SnackbarProvider>
  );
}
