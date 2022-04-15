import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import logo from '../logo.svg';
import { postData } from '../network';

function Header() {
  function handleLoginClick() {
    const login = {
      email: process.env.REACT_APP_EMAIL,
      password: process.env.REACT_APP_PASSWORD,
    };

    postData('login', login).then((data) => {
      if (typeof window.localStorage !== 'undefined') {
        localStorage.setItem('token', data.token);
        console.log('token:', localStorage.getItem('token'));
      }
    });
  }

  return (
    <header className="header">
      <Stack direction="row" className="header-stack">
        <img src={logo} className="App-logo" alt="logo" />
        <Box>Welcome to the DBLP Discovery Dataset Demo</Box>
      </Stack>
      <Button variant="contained" onClick={() => handleLoginClick()}>
        Login
      </Button>
    </header>
  );
}

export default Header;
