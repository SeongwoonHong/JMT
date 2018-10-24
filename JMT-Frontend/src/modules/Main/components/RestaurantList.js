import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';

import Restaurant from './Restaurant';

class RestaurantList extends Component {
  render() {
    const { restaurants } = this.props;

    return (
      <StyledRestaurantList>
        {
          restaurants.length > 0 ?
          restaurants.map((restaurant) => {
            return (
              <Restaurant
                restaurant={restaurant}
                key={restaurant.id}
              />
            );
          })
          : null // Loader goes here
        }
      </StyledRestaurantList>
    );
  }
}

const StyledRestaurantList = styled.div`
  background-color: ${colors.lightPink};
  padding: 5px 10px;
`;

export default RestaurantList;
