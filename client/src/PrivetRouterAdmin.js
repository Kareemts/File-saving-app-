import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';


const PrivetRouterAdmin = () => {
  const token = localStorage.getItem('token');

  let userData = jwtDecode(localStorage.getItem('token'));

  let user = userData?.user?.role;

;

  let authAdmin = false;
  if (token) {
    if (user === 'admin') {
        authAdmin = true;
    } else {
        authAdmin = false;
    }
  } else {
    authAdmin = false;
  }
  return authAdmin ? <Outlet /> : <Navigate to="/" />;
};
export default PrivetRouterAdmin;
