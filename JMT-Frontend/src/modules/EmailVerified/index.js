import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import EmailVerified from './components/EmailVerified';

class EmailVerifiedContainr extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={EmailVerified} />
      </Switch>
    );
  }
}

export default EmailVerifiedContainr;
