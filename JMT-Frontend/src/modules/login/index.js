import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from 'components';

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
      <div>
        <Header hideHamburgerMenu />
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default LoginContainer;
