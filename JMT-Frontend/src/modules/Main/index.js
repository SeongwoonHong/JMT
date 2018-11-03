import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './components/Main';

class MainContainer extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/main" component={Main} />
      </Switch>
    );
  }
}

export default MainContainer;
