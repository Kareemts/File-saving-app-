import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
const PrivetRouter = () => {
  const token = localStorage.getItem('token');

  let userData = jwtDecode(localStorage.getItem('token'));

  let user = userData?.user?.role;

  let authUser = false;
  if (token) {
    if (user === 'user') {
      authUser = true;
    } else {
      authUser = false;
    }
  } else {
    authUser = false;
  }
  return authUser ? <Outlet /> : <Navigate to="/" />;
};
export default PrivetRouter;
