import React, { Component } from 'react';
import styled from 'styled-components';
import { Restaurant } from 'actions';
import { connect } from 'react-redux';
import Loader from 'components/Loader';

@connect(state => ({
  restaurants: state.Restaurants,
  app: state.App,
}))
class RestaurantDetail extends Component {
  componentWillMount = () => {
    const { dispatch, location } = this.props;
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    return dispatch(Restaurant.getRestaurantDetail(id));
  }

  render() {
    const { restaurants, app } = this.props;

    if (app.isLoading) {
      return <Loader />;
    }

    console.log('restaurants.activeRestaurant = ', restaurants.activeRestaurant);
    return (
      <StyledRestaurantDetail>
        detail
      </StyledRestaurantDetail>
    );
  }
}

export default RestaurantDetail;

const StyledRestaurantDetail = styled.div`

`;
