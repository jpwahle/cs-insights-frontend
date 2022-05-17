import React from 'react';
import '../App.css';
import { Button, Container, Stack, Typography, useTheme } from '@mui/material';
import { ROUTE_LOGIN, ROUTE_PAPERS, ROUTE_REGISTER } from '../consts';
import { Link } from 'react-router-dom';

export default function Home() {
  const theme = useTheme();

  return (
    <div className="background">
      <Container className="home">
        <Stack spacing={2} alignItems="center">
          <div className="app-logo">D4</div>
          <Typography variant="h4">Welcome to the DBLP Discovery Dataset Demo (D4)</Typography>
          <Button
            variant="contained"
            className="home-button"
            component={Link}
            to={ROUTE_REGISTER}
            sx={{ background: theme.palette.primary.light }}
          >
            Register
          </Button>
          <Button
            variant="contained"
            className="home-button"
            component={Link}
            to={ROUTE_LOGIN}
            sx={{ background: theme.palette.primary.light }}
          >
            Login
          </Button>
          <Button variant="contained" className="home-button" component={Link} to={ROUTE_PAPERS}>
            To the app
          </Button>
          <footer
            style={{
              color: 'gray',
              position: 'fixed',
              bottom: 0,
            }}
          >
            {'Visit us on '}
            <a
              href="https://github.com/gipplab/NLP-Land-frontend"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              style={{
                color: 'gray',
              }}
            >
              GitHub
            </a>
            !
          </footer>
        </Stack>
      </Container>
    </div>
  );
}
