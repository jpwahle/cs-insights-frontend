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
import { AuthProvider } from './context/AuthContext';
import {
  ROUTE_ACCOUNT,
  ROUTE_AUTHORS,
  ROUTE_LOGIN,
  ROUTE_PAPERS,
  ROUTE_PASSWORD,
  ROUTE_REGISTER,
  ROUTE_VENUES,
} from './consts';
import Account from './routes/account';

import { ErrorBoundaryWrapper } from './context/ErrorBoundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import ForgotPassword from './routes/forgotPassword';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <SnackbarProvider>
      <ErrorBoundaryWrapper>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <FilterProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path={ROUTE_LOGIN} element={<Login />} />
                  <Route path={ROUTE_REGISTER} element={<Register />} />
                  <Route path={ROUTE_ACCOUNT} element={<Account />} />
                  <Route path={ROUTE_PASSWORD} element={<ForgotPassword />} />
                  <Route path={ROUTE_PAPERS} element={<Papers />} />
                  <Route path={ROUTE_AUTHORS} element={<Authors />} />
                  <Route path={ROUTE_VENUES} element={<Venues />} />
                </Routes>
              </BrowserRouter>
            </FilterProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundaryWrapper>
    </SnackbarProvider>
  );
}
