import { useNetworkPost } from '../network';
import { useSnack } from '../context/SnackbarContext';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../consts';
import { FormEvent } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Container,
  Box,
  Link as MuiLink,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

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

export default function Register() {
  const setSnack = useSnack();
  const navigate = useNavigate();

  const mutation = useNetworkPost('register', () => {
    navigate(ROUTE_LOGIN);
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = new FormData(event.currentTarget);
    const login = {
      fullname: input.get('fullname'),
      email: input.get('email'),
      password: input.get('password'),
    };
    if (input.get('agree')) {
      mutation.mutate(login);
    } else {
      setSnack('You need to agree to the <terms and conditions>.');
    }
  };
  return (
    <Container component="main" maxWidth="xs">
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="fullname"
                label="Fullname"
                name="fullname"
                autoComplete="fullname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="agreeTerms" color="primary" name={'agree'} />}
                label="I agree to the <terms and conditions>."
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <MuiLink component={Link} to={ROUTE_LOGIN} variant="body2">
                Already have an account? Sign in
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
