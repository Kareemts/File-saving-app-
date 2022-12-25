import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import {
  FullNameValid,
  UserNameValid,
  UserExist,
  PasswordValid,
  ConfirmasswordValid,
  FormValid,
} from './FormValidation';
import { axiosUrl } from '../../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPssword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // state for checking userExist or not
  const [userExi, setUserEx] = useState(false);

  // state for checking first name is valid or not
  const [fullNameValid, setFullNameValid] = useState(false);

  // state for checking first name is valid or not
  const [userNameValid, setUserNameValid] = useState(false);

  // state for checking password is valid or not
  const [passwordValid, setPasswordValid] = useState(false);

  // state for checking password is valid or not
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  // state for checking form is valid or not
  const [formValidation, setFormValidation] = useState(false);

  // const [colse, setClose] = useState(true);

  const validateFistName = () => {
    if (fullName.length < 3 || '') {
      setFullNameValid(true);
    } else {
      setFullNameValid(false);
    }
  };

  const validateUserName = () => {
    if (userName.length < 6 || '') {
      setUserNameValid(true);
    } else {
      setUserNameValid(false);
    }
  };

  const validatPassword = () => {
    if (password.length < 5 || '') {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const validateconfirmPassword = () => {
    if (password === confirmPassword) {
      setConfirmPasswordValid(false);
    } else {
      setConfirmPasswordValid(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      fullName === '' ||
      userName === '' ||
      password === '' ||
      passwordValid ||
      confirmPassword === '' ||
      confirmPasswordValid
    ) {
      setFormValidation(true);
    } else {
      axiosUrl
        .post('http://localhost:4000/signUp', {
          fullName,
          userName,
          password,
        })
        .then((result) => {
          console.log(result.data);
          if (result.data.userExi) {
            setUserEx(true);
          } else if (result.data.userSignUp) {
            setUserEx(false);
            navigate('/');
          }else{
            navigate('/error');
          }
        })
        .catch((err) => {
          console.log(err.message);
          navigate('/error');
        });
    }
    setTimeout(() => {
      setFormValidation(false);
      setUserEx(false);
    }, 2000);
  };

  return (
    <Box mt={8}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="signUp">
          <CssBaseline />
          <Box
            bgcolor={'white'}
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography mb component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit}>
              {userExi ? <UserExist /> : ''}
              {formValidation ? <FormValid /> : ''}
              <Grid mt container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="fullName"
                    required
                    fullWidth
                    label="Full Name"
                    autoFocus
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onKeyUp={validateFistName}
                    helperText={fullNameValid ? <FullNameValid /> : ''}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="User Name"
                    name="userName"
                    autoComplete="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyUp={validateUserName}
                    helperText={userNameValid ? <UserNameValid /> : ''}
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
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPssword(e.target.value)}
                    onKeyUp={validatPassword}
                    helperText={passwordValid ? <PasswordValid /> : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="off"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyUp={validateconfirmPassword}
                    helperText={
                      confirmPasswordValid ? <ConfirmasswordValid /> : ''
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-start" padding={2}>
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default SignUp;
