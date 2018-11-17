import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Signup from './components/Signup';

class SignupContainer extends Component {
  render() {
    return (
      <Switch>
        <Route path="/signup" component={Signup} />
      </Switch>
    );
  }
}

export default connect()(SignupContainer);
