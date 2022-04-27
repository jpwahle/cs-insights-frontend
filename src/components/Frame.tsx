import ResponsiveAppBar from './ResponsiveAppBar';
import Sidebar from './Sidebar';
import React from 'react';
import { Stack } from '@mui/material';

export default function Frame({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <Stack className="frame">
      <ResponsiveAppBar />
      <Stack direction="row" className="stack">
        <Sidebar />
        <Stack className="stack">{children}</Stack>
      </Stack>
    </Stack>
  );
}
