import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { axiosUrl } from '../../../axios/axiosInstance';
import jwtDecode from 'jwt-decode';
import UplodedFiles from './UplodedFiles';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [pdfFile, setPdfFile] = useState('');
  const [pdfName, setPdfName] = useState('');
  const [noFile, setNoFile] = useState(false);
  const [pdfErr, setPdfErr] = useState(false);
  const [pdfNameErr, setPdfNameErr] = useState(false);
  const [formError, setFormErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reload, setReload] = useState(null);
  let userData = jwtDecode(localStorage.getItem('token'));
  const navigat = useNavigate();

  const upload = () => {
    if (pdfFile === '') setNoFile(true);
    if (!pdfFile.type === 'application/pdf') setPdfErr(true);

    // if (
    //   !pdfFile === '' &&
    //   pdfFile.type === 'application/pdf' &&
    //   !pdfName === ''
    // ) {

    // }

    const data = new FormData();
    data.append('file', pdfFile.file);
    axiosUrl
      .post('/uploadPdf', data, {
        params: {
          pdfName,
          userId: userData.user._id,
        },
      })
      .then((result) => {
        if (result.data.noFile) setNoFile(true);
        if (result.data.posted) setSuccess(true);
        setReload(Math.random());
      })
      .catch((err) => {
        navigat('/error');
      });

    setTimeout(() => {
      setFormErr(false);
      setPdfNameErr(false);
      setPdfErr(false);
      setNoFile(false);
      setSuccess(false);
    }, 2000);
  };

  return (
    <Box m={3}>
      <Box
        sx={{ width: '100%' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box
          p={3}
          display={'flex'}
          alignItems={'center'}
          flexDirection={'column'}
          boxShadow=" 0px 10px 37px -3px rgba(0,0,0,0.1)"
          borderRadius={3}
        >
          <Box mt={2}>
            <Typography>Upload new file</Typography>
          </Box>
          {noFile ? (
            <Alert
              sx={{
                marginTop: 5,
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              severity="warning"
            >
              <Box>Select a file</Box>
            </Alert>
          ) : (
            ''
          )}
          {success ? (
            <Alert
              sx={{
                marginTop: 5,
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              severity="success"
            >
              <Box>File saved</Box>
            </Alert>
          ) : (
            ''
          )}
          {pdfErr ? (
            <Alert
              sx={{
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              severity="warning"
            >
              <Box>Only accept PDF </Box>
            </Alert>
          ) : (
            ''
          )}

          <Box mt={3} mb={2}>
            <input
              type="file"
              accept=".pdf"
              placeholder="Upload your Resume"
              onChange={(e) => setPdfFile({ file: e.target.files[0] })}
            />
          </Box>
          {pdfNameErr ? (
            <Alert
              sx={{
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              severity="warning"
            >
              <Box>Please add a file name</Box>
            </Alert>
          ) : (
            ''
          )}
          <Box>
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="File Name"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setPdfName(e.target.value)}
            />
          </Box>
          <Button variant="contained" size="small" onClick={() => upload()}>
            save
          </Button>
        </Box>

        <Box sx={{ width: '100%' }} mt={3}>
          <Box>
            <UplodedFiles reload={reload} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
