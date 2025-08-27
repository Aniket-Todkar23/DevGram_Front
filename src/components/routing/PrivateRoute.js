import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  return !isAuthenticated && !loading ? (
    <Navigate to="/login" />
  ) : (
    <Component />
  );
};

export default PrivateRoute;