import React, { Component } from 'react';
import history from 'utils/history';

class Categories extends Component {
  goToRestaurantLanding = () => {
    return history.push('/main/restaurant-landing');
  }

  render() {
    return (
      <div>
        <div onClick={this.goToRestaurantLanding}>
          Restaurants
        </div>
        <div>
          Movies
        </div>
        <div>
          Bowling
        </div>
      </div>
    );
  }
}

export default Categories;
