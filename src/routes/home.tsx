import React from 'react';
import '../App.css';
import { Button, Container, Stack, Typography, useTheme } from '@mui/material';
import { ROUTE_LOGIN, ROUTE_PAPERS, ROUTE_REGISTER } from '../consts';
import { Link } from 'react-router-dom';
import GitInfo from 'react-git-info/macro';

export default function Home() {
  const theme = useTheme();
  const gitInfo = GitInfo();

  return (
    <div style={{ backgroundColor: '#eeeeee' }}>
      <Container className="home">
        <Stack spacing={2} alignItems="center">
          <div className="app-logo">D4</div>
          <Typography variant="h4" fontWeight={'bold'}>
            Welcome to the DBLP Discovery Dataset Demo (D4)
          </Typography>
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
          <div style={{ background: '#dddddd', padding: 'var(--size-small)' }}>
            <Typography>Running</Typography>
            <Typography className="statsHighlight">v{process.env.REACT_APP_VERSION}</Typography>
            <Typography>last updated at</Typography>
            <Typography className="statsHighlight">
              {new Date(gitInfo.commit.date).toUTCString()}
            </Typography>
            <Typography>on commit</Typography>
            <Typography>
              <Link
                to={'https://github.com/gipplab/NLP-Land-frontend/commit/' + gitInfo.commit.hash}
                target="_blank"
                rel="noopener noreferrer"
                className="statsHighlight"
              >
                {gitInfo.commit.hash}
              </Link>
            </Typography>
            <Typography>on branch</Typography>
            <Typography className="statsHighlight">{gitInfo.branch}</Typography>
          </div>
          <div style={{ width: '50%', color: 'red' }}>
            Disclaimer: Sending a new request (e.g. by applying filters, changing the sorting, or
            changing the page number), while the result of another request is still being awaited,
            can have the effect of the new request not being (entirely) fulfilled.
          </div>
          <footer
            style={{
              color: 'gray',
              position: 'fixed',
              bottom: 5,
            }}
          >
            <div>
              {'Visit us on '}
              <Link
                to="https://github.com/gipplab/NLP-Land-frontend"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'gray',
                }}
              >
                GitHub
              </Link>
              !
            </div>
          </footer>
        </Stack>
      </Container>
    </div>
  );
}
