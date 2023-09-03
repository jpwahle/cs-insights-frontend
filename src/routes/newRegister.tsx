import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Link as MuiLink,
  Checkbox,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import Copyright from '../Copyright';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN, ROUTE_HOME } from '../consts';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
// import * as yup from 'yup';

export default function NewRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validate = (values: FormikValues) => {
    const errors: any = {};
    if (!values.firstName) {
      errors.firstName = 'First name required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last name required';
    }
    if (!values.email) {
      errors.email = 'E-Mail address required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
      errors.password = 'Password must contain at least one capital letter and one number';
    }
    if (!values.passwordConfirm) {
      errors.passwordConfirm = 'Please confirm your password';
    } else if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = 'Passwords do not match';
    }
    if (!values.agree) {
      errors.agree = 'You must agree to the terms and conditions in order to proceed';
    }
    return errors;
  };

  const handleSubmit = (values: FormikValues) => {
    console.log(values);
    navigate(ROUTE_HOME);
  };

  return (
    <div className="background-gradient">
      <Container maxWidth="xs" className="form-container">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            agree: false,
          }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {(props) => {
            return (
              <Form>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ m: 2, bgcolor: '#2979fa', height: '50px', width: '50px' }}>
                    <PersonAddAlt1OutlinedIcon />
                  </Avatar>
                  <Box>
                    <Field
                      as={TextField}
                      label="First Name"
                      type="text"
                      name="firstName"
                      margin="dense"
                      autoComplete="given-name"
                      fullWidth
                      helperText={<ErrorMessage name="firstName" />}
                      error={props.errors.firstName && props.touched.firstName}
                    />
                    <Field
                      as={TextField}
                      label="Last Name"
                      type="text"
                      name="lastName"
                      margin="dense"
                      autoComplete="family-name"
                      fullWidth
                      helperText={<ErrorMessage name="lastName" />}
                      error={props.errors.lastName && props.touched.lastName}
                    />
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
                      autoComplete="new-password"
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
                    <Field
                      as={TextField}
                      label="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                      name="passwordConfirm"
                      margin="dense"
                      autoComplete="new-password"
                      fullWidth
                      helperText={<ErrorMessage name="passwordConfirm" />}
                      error={props.errors.passwordConfirm && props.touched.passwordConfirm}
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
                    <label>
                      <Field
                        sx={{ pl: 0 }}
                        as={Checkbox}
                        type="checkbox"
                        name="agree"
                        error={props.errors.agree}
                      />
                      I agree to the{' '}
                      <MuiLink //TO-DO UPDATE LINK WHEN IT IS FOUND
                        component={Link}
                        underline="hover"
                        to={'#'}
                      >
                        terms and conditions
                      </MuiLink>
                    </label>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={!props.isValid}
                      sx={{ my: 2 }}
                    >
                      Register an account
                    </Button>
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
        <Box sx={{ py: 1 }}>
          <MuiLink component={Link} to={ROUTE_LOGIN} variant="body2">
            Already have an account? Sign in
          </MuiLink>
        </Box>
      </Container>
      <Copyright />
    </div>
  );
}
