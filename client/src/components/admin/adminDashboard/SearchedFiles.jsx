import { Box, CardMedia, Divider } from '@mui/material';
import React from 'react';
import GetAppIcon from '@mui/icons-material/GetApp';

const SearchedFiles = ({ serchData }) => {
  console.log(serchData);
  return (
    <Box>
      <Box>
        {serchData.map((file, index) => {
          return (
            <Box
              p={2}
              mt={3}
              m={3}
              key={index}
              display={'flex'}
              justifyContent="space-evenly"
              boxShadow=" 0px 10px 37px -3px rgba(0,0,0,0.1)"
              borderRadius={3}
            >
              <Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems={'center'}
                  fontWeight={'bold'}
                >
                  File Name
                </Box>
                <Divider />
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems={'center'}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      borderRadius: 1,
                      width: {
                        xs: '2rem',
                        sm: '3rem',
                      },
                      height: {
                        xs: '2rem',
                        sm: '3rem',
                      },
                    }}
                    src="https://img.icons8.com/cute-clipart/512/pdf.png"
                    alt="green iguana"
                  />
                  <Box>{file.givenFileName}</Box>
                </Box>
              </Box>
              <Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems={'center'}
                  fontWeight={'bold'}
                >
                  Uploaded User
                </Box>
                <Divider />
                <Box mt={2}>{file?.userId.userName}</Box>
              </Box>
              <Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems={'center'}
                  fontWeight={'bold'}
                >
                  Uploaded Date
                </Box>
                <Divider />
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="center"
                  alignItems={'center'}
                >
                  {new Date().toDateString(file.uploadedTimenew)}
                </Box>
              </Box>
              <Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems={'center'}
                  fontWeight={'bold'}
                >
                  Download
                </Box>
                <Divider />
                <Box
                  mt={2}
                  component={'div'}
                  // onClick={() => download(file.givenFileName)}
                  display="flex"
                  justifyContent="center"
                  alignItems={'center'}
                >
                  <GetAppIcon />
                </Box>
              </Box>

              {/* <a
                  href={
                    'https://drive.google.com/file/d/1MHjYD3F28WBB0pLXWEJwpK0TCkvG7agx/view?usp=share_link'
                  }
                  download
                  target="blank"
                >
                  <GetAppIcon />
                </a> */}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SearchedFiles;
