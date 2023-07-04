import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PublicRoute = ({ component: Component, isAuthenticated, restricted, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && restricted ? (
        <Navigate to="/admin-dashboard" replace />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default PublicRoute;