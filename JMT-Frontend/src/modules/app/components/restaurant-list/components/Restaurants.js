import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';
import TransitionGroup from 'react-transition-group-plus';
import { Restaurant } from 'components';

class Restaurants extends Component {
  render() {
    const { restaurants, onClick } = this.props;

    return (
      <StyledRestaurantList>
        <TransitionGroup>
          {
            restaurants.length > 0 ?
            restaurants.map((restaurant, index) => {
              return (
                <Restaurant
                  data={restaurant}
                  key={restaurant.id}
                  delay={index / restaurants.length}
                  onClick={onClick}
                  shouldAnimate
                />
              );
            })
            : null // Loader goes here
          }
        </TransitionGroup>
      </StyledRestaurantList>
    );
  }
}

const StyledRestaurantList = styled.div`
  background-color: ${colors.lightPink};
  padding: 5px 10px;
`;

export default Restaurants;
