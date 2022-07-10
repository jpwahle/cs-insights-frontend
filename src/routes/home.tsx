import '../App.css';
import { Button, Container, Stack, Typography, useTheme } from '@mui/material';
import { ROUTE_LOGIN, ROUTE_PAPERS, ROUTE_REGISTER } from '../consts';
import { Link } from 'react-router-dom';
import GitInfo from 'react-git-info/macro';
import { GitHub } from '@mui/icons-material';

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
          <Typography className="statsHighlight" style={{ margin: '0px' }}>
            v{process.env.REACT_APP_VERSION}
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
          <Stack direction={'row'} alignItems={'center'}>
            Visit us on
            <a
              href="https://github.com/gipplab/NLP-Land-frontend"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'black',
                marginLeft: '.2rem',
              }}
            >
              <Stack direction={'row'} alignItems={'center'}>
                {<GitHub />}
                {'GitHub'}
              </Stack>
            </a>
            !
          </Stack>
          <div style={{ width: '50%', color: 'red' }}>
            The issues with an out-of-sync state should be fixed. Please report if you still
            experience a desynced state.
          </div>
          <footer
            style={{
              color: 'gray',
              position: 'fixed',
              bottom: 3,
            }}
          >
            <Typography color={'gray'}>
              {'Running commit '}
              <a
                href={'https://github.com/gipplab/NLP-Land-frontend/commit/' + gitInfo.commit.hash}
                target="_blank"
                rel="noopener noreferrer"
                className="statsHighlight"
              >
                {gitInfo.commit.shortHash}
              </a>
              {` from `}
              {new Date(gitInfo.commit.date).toUTCString()}
            </Typography>
          </footer>
        </Stack>
      </Container>
    </div>
  );
}
