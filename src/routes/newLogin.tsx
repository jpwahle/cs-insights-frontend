import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Link as MuiLink,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { FormikValues, Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_PAPERS, ROUTE_REGISTER } from '../consts';
import Copyright from '../Copyright';

export default function NewLogin() {
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  interface User {
    email: string;
    password: string;
  }

  const hardcodedUsers: User[] = [
    { email: 'test@test.com', password: 'password1' },
    { email: 'user@example.com', password: 'password2' },
  ];

  const validate = (values: FormikValues) => {
    const errors: any = {};
    setLoginError(false);
    if (!values.email) {
      errors.email = 'E-Mail address required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password required';
    }

    return errors;
  };

  const handleSubmit = (values: FormikValues) => {
    console.log(values);
    const userSearch = hardcodedUsers.find(
      (foundUser) => foundUser.email === values.email && foundUser.password === values.password
    );
    if (!userSearch) {
      setLoginError(true);
    } else {
      setLoginError(false);
      alert(JSON.stringify(values, null, 2));
      navigate(ROUTE_PAPERS);
    }
  };

  return (
    <div className="background-gradient">
      <Container maxWidth="xs" className="form-container">
        <Formik
          initialValues={{ email: '', password: '', remember: true }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {(props) => {
            return (
              <Form>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 2, bgcolor: '#5a5ae6', height: '50px', width: '50px' }}>
                    <LockOutlined />
                  </Avatar>
                  <Box>
                    <Field
                      as={TextField}
                      label="E-Mail Address"
                      type="email"
                      name="email"
                      margin="dense"
                      autoComplete="email"
                      fullWidth
                      helperText={<ErrorMessage name="email" />}
                      error={props.errors.email && props.touched.email}
                    />
                    <Field
                      as={TextField}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      margin="dense"
                      fullWidth
                      helperText={<ErrorMessage name="password" />}
                      error={props.errors.password && props.touched.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {loginError && <p>User not found!</p>}
                    <label>
                      <Field sx={{ pl: 0 }} as={Checkbox} type="checkbox" name="remember" />
                      Remember me
                    </label>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={!props.isValid}
                      sx={{ my: 2 }}
                    >
                      Sign In
                    </Button>
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
        <Box sx={{ py: 1 }}>
          <MuiLink component={Link} to={ROUTE_REGISTER} variant="body2">
            Don't have an account? Sign Up
          </MuiLink>
        </Box>
      </Container>
      <Copyright />
    </div>
  );
}
