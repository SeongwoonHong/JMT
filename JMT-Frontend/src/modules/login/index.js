import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/Login';

@connect(state => ({
  auth: state.Auth,
}))
class LoginContainer extends Component {
  render() {
    const { auth } = this.props;

    if (auth.user && auth.user.success) {
      return <Redirect to="/" />;
    }

    return (
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    );
  }
}

export default LoginContainer;
