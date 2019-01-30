import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Loader } from 'components';

const PrivateRoute = ({
  app, auth, location, component: Component, ...rest
}) => (
  app.isLoading ?
    <Loader /> : (
      <Route
        {...rest}
        render={props => (auth.user ? (
          <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          ))}
      />
    ));

export default connect(state => ({
  auth: state.Auth,
  app: state.App,
}))(PrivateRoute);
