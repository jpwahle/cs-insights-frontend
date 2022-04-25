import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SnackbarContextProvider } from './context/SnackbarContextProvider';
import Login from './routes/login';
import Register from './routes/register';
import Papers from './routes/papers';
import Authors from './routes/authors';
import Home from './routes/home';
import Venues from './routes/venues';

export default function App() {
  return (
    <SnackbarContextProvider>
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
    </SnackbarContextProvider>
  );
}
