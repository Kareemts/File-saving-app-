import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { Box } from '@mui/material';
import { Alert } from '@mui/material';

export const UserExist = () => {
  return (
    <Alert
      sx={{
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      severity="warning"
    >
      <Box> User name already exist please choose another one</Box>
    </Alert>
  );
};

export const FormValid = () => {
  return (
    <Alert
      sx={{
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      severity="warning"
    >
      <Box>Please fill the form properly</Box>
    </Alert>
  );
};

export const FullNameValid = () => {
  return (
    <Box color={'red'} display={'flex'}>
      <ErrorIcon sx={{ fontSize: 18 }} />
      <Box ml>Name must have more than 3 letters</Box>
    </Box>
  );
};

export const UserNameValid = () => {
  return (
    <Box color={'red'} display={'flex'}>
      <ErrorIcon sx={{ fontSize: 18 }} />
      <Box ml> User name must have 6 letters </Box>
    </Box>
  );
};



export const PasswordValid = () => {
  return (
    <Box color={'red'} display={'flex'}>
      <ErrorIcon sx={{ fontSize: 18 }} />
      <Box ml> Password must have 5 digits </Box>
    </Box>
  );
};

export const ConfirmasswordValid = () => {
  return (
    <Box color={'red'} display={'flex'}>
      <ErrorIcon sx={{ fontSize: 18 }} />
      <Box ml> Password not match </Box>
    </Box>
  );
};
