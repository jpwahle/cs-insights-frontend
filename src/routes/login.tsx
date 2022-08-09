import { useNetworkPost } from '../network';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { ROUTE_PAPERS, ROUTE_PASSWORD, ROUTE_REGISTER } from '../consts';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <MuiLink color="inherit" href="https://mui.com/">
        Your Website
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const mutation = useNetworkPost('login');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = new FormData(event.currentTarget);
    const login = {
      email: input.get('email'),
      password: input.get('password'),
    };
    mutation.mutate(login, {
      onSuccess: (data: any) => {
        if (data) {
          auth.login(data.token, !!input.get('remember'));
          navigate(ROUTE_PAPERS);
        }
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ background: 'white' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" name="remember" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <MuiLink component={Link} to={ROUTE_PASSWORD} variant="body2">
                Forgot password?
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink component={Link} to={ROUTE_REGISTER} variant="body2">
                {"Don't have an account? Sign Up"}
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
