import React, { useState, useEffect } from 'react';
import '../App.css';
import { Button, Container, Stack, Typography, useTheme } from '@mui/material';
import { ROUTE_LOGIN, ROUTE_PAPERS, ROUTE_REGISTER } from '../consts';
import { Link } from 'react-router-dom';
import { GitHub } from '@mui/icons-material';
import { useNetworkGet } from '../network';
import { Status } from '../types';
import { version } from 'd3';

export default function Home() {
  const theme = useTheme();
  console.log(version);
  const [backendVersion, setBackendVersion] = useState('0.0.1');
  const [predictionEndpointVersion, setpredictionEndpointVersion] = useState('0.0.1');

  const { refetch: refetchBackend } = useNetworkGet('status', '', (status: Status) =>
    setBackendVersion(status.version)
  );
  const { refetch: refetchPredictionEndpoint } = useNetworkGet(
    'statusPredictionBackend',
    '',
    (status: Status) => setpredictionEndpointVersion(status.version)
  );

  useEffect(() => {
    refetchBackend();
    refetchPredictionEndpoint();
  }, []);

  return (
    <div style={{ backgroundColor: '#eeeeee' }}>
      <Container className="home" style={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2} alignItems="center" style={{ marginTop: '-100px' }}>
          <img src="/logo.jpg" width={'35%'} alt={'logo'}></img>
          <Typography variant="h4" fontWeight={'bold'}>
            Welcome to the CS-Insights Demo
          </Typography>
          <Typography className="statsHighlight" style={{ margin: '0px' }}>
            frontend: v{process.env.REACT_APP_VERSION} - backend: v{backendVersion} -
            prediction-endpoint : v{predictionEndpointVersion}
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
              href="https://github.com/gipplab/cs-insights-main"
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
        </Stack>
      </Container>
    </div>
  );
}
