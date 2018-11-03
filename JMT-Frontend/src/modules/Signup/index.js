import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'components/Loader';

import Signup from './components/Signup';

class SignupContainer extends Component {
  render() {
    const { app } = this.props;
    const { isLoading } = app;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <Switch>
        <Route path="/signup" component={Signup} />
      </Switch>
    );
  }
}

export default connect(state => ({
  app: state.App,
}))(SignupContainer);
