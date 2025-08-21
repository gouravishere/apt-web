import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  const { isAuthenticated, user='user' } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (roles && !roles.includes(user)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;


