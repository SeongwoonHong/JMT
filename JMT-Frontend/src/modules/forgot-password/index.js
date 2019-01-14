import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from 'components';

import ForgotPassword from './components/ForgotPassword';

class ForgotPasswordContainer extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </div>
    );
  }
}

export default ForgotPasswordContainer;
