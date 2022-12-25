import { CardMedia, Divider } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import GetAppIcon from '@mui/icons-material/GetApp';

const AllFiles = ({ files }) => {
  return (
    <Box>
      <Box>
        {files.map((file, index) => {
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
                  <Box maxWidth={200}>{file.FileName}</Box>
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
                  display="flex"
                  justifyContent="center"
                  alignItems={'center'}
                >
                  {' '}
                  <a
                    download
                    target="blank"
                    href={`/files/${file.FileName}.pdf`}
                    mt={2}
                    component={'div'}
                  >
                    <GetAppIcon />
                  </a>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default AllFiles;
