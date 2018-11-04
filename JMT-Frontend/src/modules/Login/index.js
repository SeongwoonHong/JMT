import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/Login';

class LoginContainer extends Component {
  render() {
    const { auth } = this.props;

    if (auth.user && auth.user.success) {
      return <Redirect to="/main" />;
    }

    return (
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    );
  }
}

export default connect(state => ({
  auth: state.Auth,
}))(LoginContainer);
