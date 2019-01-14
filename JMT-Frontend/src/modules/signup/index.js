import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from 'components';

import Signup from './components/Signup';

class SignupContainer extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default connect()(SignupContainer);
