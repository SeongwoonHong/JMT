import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header, NotFound } from 'components';
import { PrivateRoute } from 'components/HOC';

import Categories from './components/categories';
import RestaurantLanding from './components/restaurant-landing';
import RestaurantList from './components/restaurant-list';
import RestaurantDetail from './components/restaurant-detail';
import Group from './components/group';
import User from './components/user';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/main/categories" component={Categories} />
          <Route
            path="/main/restaurant-landing"
            component={RestaurantLanding}
          />
          <Route path="/main/restaurant-list" component={RestaurantList} />
          <Route path="/main/restaurant-detail" component={RestaurantDetail} />
          <Route path="/main/group" component={Group} />
          <PrivateRoute path="/main/user" component={User} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
