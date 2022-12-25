import { CardMedia, Divider, InputBase, Typography } from '@mui/material';
import React from 'react';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { axiosUrl } from '../../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import AllFiles from './AllFiles';
import SearchingFIle from './SearchingFIle';

const UplodedFiles = ({ reload }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [noFiles, setNoFiles] = useState(false);
  const [searchingData, setSearchingData] = useState('');
  const [noResult, setNoResults] = useState(false);
  const [searchResult, setSearchReasult] = useState(false);
  const [serchData, setSearchData] = useState([]);

  let userData = jwtDecode(localStorage.getItem('token'));

  console.log(userData);

  useEffect(() => {
    axiosUrl
      .get('/getUploadedFiles', {
        params: {
          userId: userData.user._id,
        },
      })
      .then((result) => {
        if (result.data.length <= 0) {
          setNoFiles(true);
        } else {
          setFiles(result.data);
          setNoFiles(false);
        }
      })
      .catch((err) => {
        navigate('/error');
      });
  }, [userData.user._id, reload, navigate]);

  // const download = (fileName) => {
  //   axiosUrl
  //     .get('/download', {
  //       responseType: 'blob',
  //       params: {
  //         fileName,
  //       },
  //     })
  //     .then((result) => {
  //       console.log(result.data);
  //     })
  //     .catch((err) => {});
  // };

  const serchUser = () => {
    if (searchingData === '') {
      setNoResults(false);
      setSearchReasult(false);
    } else {
      setNoResults(true);
      axiosUrl
        .get('/serchFileUser', {
          params: {
            searchingData,
            userId: userData.user._id,
          },
        })
        .then((result) => {
          if (result.data.length <= 0) setSearchReasult(true);
          if (result.data.length > 0) setSearchReasult(false);
          setSearchData(result.data);
        })
        .catch((err) => {});
    }
  };

  return (
    <Box p={3} boxShadow=" 0px 10px 37px -3px rgba(0,0,0,0.1)" borderRadius={3}>
      <Box display="flex" justifyContent="center">
        <Typography fontWeight={'bold'}>Your saved files</Typography>
      </Box>
      <Box
        ml={5}
        p
        display={'flex'}
        width={'200px'}
        height={'20px'}
        alignItems={'center'}
        sx={{
          backgroundColor: '#e2e2e2',
          borderRadius: 2,
          cursor: 'pointer',
        }}
      >
        <SearchIcon sx={{ color: '#199FF7' }} />
        <InputBase
          variant="standard"
          fullWidth
          placeholder="Search..."
          size="small"
          onChange={(e) => {
            setSearchingData(e.target.value);
          }}
          onKeyUp={serchUser}
        />
      </Box>
      {noFiles ? (
        <Box mt={5} display="flex" justifyContent="center">
          No files
        </Box>
      ) : (
        ''
      )}
      {searchResult ? (
        <Box mt={5} display="flex" justifyContent="center">
          No result found
        </Box>
      ) : (
        ''
      )}
      {noResult ? (
        <SearchingFIle serchData={serchData} />
      ) : (
        <AllFiles files={files} />
      )}
    </Box>
  );
};

export default UplodedFiles;
