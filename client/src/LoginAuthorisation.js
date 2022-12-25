import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function LoginAuthorisation() {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Outlet />;
  } else {
    let userData = jwtDecode(localStorage.getItem('token'));

    let user = userData?.user?.role;
    if (user === 'user') {
      return <Navigate to="/Home" />;
    } else if (user === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    }
  }
}

export default LoginAuthorisation;
