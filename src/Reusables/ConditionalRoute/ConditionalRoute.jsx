import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ConditionalRoute = ({ children, condition, redirectPath }) => {
  const renderer = () => {
    if (condition) return children;
    return (
      <Redirect
        to={{
          pathname: redirectPath,
        }}
      />
    );
  };

  return (
    <Route
      render={renderer}
    />
  );
};

ConditionalRoute.propTypes = {
  children: PropTypes.object.isRequired,
  condition: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string.isRequired,
};

export default ConditionalRoute;
