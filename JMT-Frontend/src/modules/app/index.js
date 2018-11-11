import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './containers/main';
import RestaurantDetail from './containers/restaurant-detail';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route path="/main/restaurant-detail" component={RestaurantDetail} />
      </Switch>
    );
  }
}

export default App;
