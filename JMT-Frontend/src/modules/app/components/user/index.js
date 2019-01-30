import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MyAccount from './components/my-account';

class UserContainer extends Component {
  render() {
    return (
      <Switch>
        <Route path="/main/user/my-account" component={MyAccount} />
      </Switch>
    );
  }
}

export default UserContainer;
