import { Box, InputBase, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosUrl } from '../../../axios/axiosInstance';
import SearchIcon from '@mui/icons-material/Search';
import SearchedFiles from './SearchedFiles';
import AllFiles from './AllFiles';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [serchData, setSearchData] = useState([]);
  const [noResult, setNoResults] = useState(false);
  const [searchResult, setSearchReasult] = useState(false);
  const [searchingData, setSearchingData] = useState('');
  const [noFiles, setNoFiles] = useState(false);
  const navigat = useNavigate();

  useEffect(() => {
    axiosUrl
      .get('/admin/getAllFiles')
      .then((result) => {
        if (result.data.length <= 0) {
          setNoFiles(true);
        }
        setFiles(result.data);
      })
      .catch((err) => {
        navigate('/error');
      });
  }, [navigate]);

  const serchUser = () => {
    if (searchingData === '') {
      setNoResults(false);
      setSearchReasult(false);
    } else {
      setNoResults(true);
      axiosUrl
        .get('/admin/serchFile', {
          params: {
            searchingData,
          },
        })
        .then((result) => {
          if (result.data.length <= 0) setSearchReasult(true);
          if (result.data.length > 0) setSearchReasult(false);
          setSearchData(result.data);
        })
        .catch((err) => {
          navigat('/error');
        });
    }
  };
  return (
    <Box>
      <Box>
        <Box display="flex" justifyContent="center">
          <Typography fontWeight={'bold'} fontSize={25}>
            ALL FILES ({files.length})
          </Typography>
        </Box>
        {noFiles ? (
          <Box mt={5} display="flex" justifyContent="center">
            No files
          </Box>
        ) : (
          ''
        )}

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
        {searchResult ? (
          <Box mt={5} display="flex" justifyContent="center">
            No result found
          </Box>
        ) : (
          ''
        )}
        <Box>
          {noResult ? (
            <SearchedFiles serchData={serchData} />
          ) : (
            <AllFiles files={files} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
