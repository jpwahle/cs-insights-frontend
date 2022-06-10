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
  ROUTE_CITATIONS,
  ROUTE_FIELDS_OF_STUDY,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_PAPER_TYPES,
  ROUTE_PAPERS,
  ROUTE_PASSWORD,
  ROUTE_REGISTER,
  ROUTE_TOPICS,
  ROUTE_VENUES,
} from './consts';
import Account from './routes/account';

import { ErrorBoundaryWrapper } from './context/ErrorBoundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import ForgotPassword from './routes/forgotPassword';
import PaperTypes from './routes/paperTypes';
import FieldsOfStudy from './routes/fieldsOfStudy';
import Citations from './routes/citations';
import Topics from './routes/topics';

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
                  <Route path={ROUTE_HOME} element={<Home />} />
                  <Route path={ROUTE_LOGIN} element={<Login />} />
                  <Route path={ROUTE_REGISTER} element={<Register />} />
                  <Route path={ROUTE_ACCOUNT} element={<Account />} />
                  <Route path={ROUTE_PASSWORD} element={<ForgotPassword />} />
                  <Route path={ROUTE_PAPERS} element={<Papers />} />
                  <Route path={ROUTE_AUTHORS} element={<Authors />} />
                  <Route path={ROUTE_VENUES} element={<Venues />} />
                  <Route path={ROUTE_PAPER_TYPES} element={<PaperTypes />} />
                  <Route path={ROUTE_FIELDS_OF_STUDY} element={<FieldsOfStudy />} />
                  <Route path={ROUTE_CITATIONS} element={<Citations />} />
                  <Route path={ROUTE_TOPICS} element={<Topics />} />
                </Routes>
              </BrowserRouter>
            </FilterProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundaryWrapper>
    </SnackbarProvider>
  );
}
