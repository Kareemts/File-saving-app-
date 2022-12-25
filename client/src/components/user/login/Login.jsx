import { Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React from 'react';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <Box>
      <Container>
        <Stack direction="row" spacing={1} justifyContent="space-evenly">
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <lottie-player
                src="https://assets7.lottiefiles.com/packages/lf20_comuBU.json"
                background="transparent"
                speed="1"
                style={{ width: '300px', height: '300px' }}
                loop
                autoplay
              ></lottie-player>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold' }}
                align="center"
                color="#838383"
              >
                SECURE YOUR FILES WITH US
              </Typography>
            </Box>
          </Box>
          <Box>
            <LoginForm />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
