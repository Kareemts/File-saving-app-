import { AppBar, Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchResult from './SearchResult';

const Navbar = () => {
  const navigat = useNavigate();
  const userName = JSON.parse(localStorage.getItem('userData'));

  const [openSearch, setOpenSearch] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigat('/');
  };

  return (
    <Box mb={10}>
      <AppBar position="fixed" sx={{ backgroundColor: '#FAFAFA' }}>
        <Box p display={'flex'} justifyContent={'space-between'}>
          <Box p>
            <Typography
              variant="h6"
              sx={{
                display: { xs: 'none', sm: 'block' },
                color: 'black',
                cursor: 'pointer',
              }}
              // onClick={() => navigate('/Home')}
            >
              File storager
            </Typography>
            <Box
              sx={{ display: { xs: 'block', sm: 'none', cursor: 'pointer' } }}
              // onClick={() => navigate('/Home')}
            >
              <Box
                display={'flex'}
                justifyContent="center"
                alignItems={'center'}
              >
                <Typography variant="h6" sx={{ color: 'black', fontSize: 12 }}>
                  File storager
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box p>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              component={'div'}
              onClick={handleClick}
            >
              <Avatar sx={{ width: 30, height: 30, cursor: 'pointer' }} />

              <Typography
                pl
                variant="h6"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: 'black',
                  cursor: 'pointer',
                  fontSize: 15,
                }}
              >
                {userName?.user}
              </Typography>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <Box>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </Box>
              </Menu>
            </Box>
            <Box
              sx={{ display: { xs: 'block', sm: 'none', cursor: 'pointer' } }}
            >
              <Box
                display={'flex'}
                justifyContent="center"
                alignItems={'center'}
                component={'div'}
                onClick={handleClick}
              >
                <Typography variant="h6" sx={{ color: 'black', fontSize: 12 }}>
                  {userName?.user}
                </Typography>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <Box>
                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                  </Box>
                </Menu>
              </Box>
            </Box>
          </Box>
        </Box>
      </AppBar>
      <SearchResult openSearch={openSearch} setOpenSearch={setOpenSearch} />
    </Box>
  );
};

export default Navbar;
