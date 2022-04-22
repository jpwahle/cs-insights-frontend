import React from 'react';
import { Box, Stack } from '@mui/material';
import logo from '../logo.svg';

export default function Header() {
  return (
    <header className="header">
      <Stack direction="row" className="header-stack">
        <img src={logo} className="App-logo" alt="logo" />
        <Box>Welcome to the DBLP Discovery Dataset Demo</Box>
      </Stack>
    </header>
  );
}
