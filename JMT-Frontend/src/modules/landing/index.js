import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/Landing';

class LandingContainr extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    );
  }
}

export default LandingContainr;
