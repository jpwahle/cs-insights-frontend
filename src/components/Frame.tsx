import ResponsiveAppBar from './ResponsiveAppBar';
import Sidebar from './Sidebar';
import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useRequestHelper } from '../context/NetworkHook';
import { ROUTE_LOGIN } from '../consts';
import { RefreshProvider } from '../context/RefreshContext';

export default function Frame({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const requestHelper = useRequestHelper();
  if (requestHelper.token) {
    return (
      <Stack className="frame">
        <ResponsiveAppBar />
        <Stack direction="row" className="stack">
          <Sidebar />
          <Stack className="stack">
            <RefreshProvider>{children}</RefreshProvider>
          </Stack>
        </Stack>
      </Stack>
    );
  } else {
    useEffect(() => {
      requestHelper.setSnack('You need to login to access this page.');
    });
    return <Navigate to={ROUTE_LOGIN} />;
  }
}
