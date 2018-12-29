import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/landing';
import RestaurantList from './components/restaurant-list';
import RestaurantDetail from './components/restaurant-detail';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/main/landing" component={Landing} />
        <Route path="/main/restaurant-list" component={RestaurantList} />
        <Route path="/main/restaurant-detail" component={RestaurantDetail} />
      </Switch>
    );
  }
}

export default App;
