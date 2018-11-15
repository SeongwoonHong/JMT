import React, { Component } from 'react';
import styled from 'styled-components';
import { Restaurant } from 'actions';
import { connect } from 'react-redux';
import Loader from 'components/Loader';

import ImageSlide from './ImageSlide';

@connect(state => ({
  restaurants: state.Restaurants,
  app: state.App,
}))
class RestaurantDetail extends Component {
  state = {
    imageIndex: 0,
  }

  componentWillMount = () => {
    const { dispatch, location } = this.props;
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    return dispatch(Restaurant.getRestaurantDetail(id));
  }

  increaseIndex = () => {
    return this.setState({ imageIndex: this.state.imageIndex + 1 });
  }

  decreaseIndex = () => {
    return this.setState({ imageIndex: this.state.imageIndex - 1 });
  }

  render() {
    const { restaurants, app } = this.props;
    const { imageIndex } = this.state;

    if (app.isLoading) {
      return <Loader />;
    }

    console.log('restaurants.activeRestaurant = ', restaurants.activeRestaurant);
    return (
      <StyledRestaurantDetail>
        <ImageSlide
          images={[
            'https://s3-media3.fl.yelpcdn.com/bphoto/Jt-heyagIeWlSGNcD6DSUw/o.jpg', // for now, it's hardcoded until backend has photos database table
            'https://s3-media2.fl.yelpcdn.com/bphoto/zgESCUABKFAvTATWHpWT3w/o.jpg', // for now, it's hardcoded until backend has photos database table
            'https://s3-media2.fl.yelpcdn.com/bphoto/qxl3bpWRv_Vm9t8kQNxgGQ/o.jpg', // for now, it's hardcoded until backend has photos database table
          ]}
          currentIndex={imageIndex}
        />
      </StyledRestaurantDetail>
    );
  }
}

export default RestaurantDetail;

const StyledRestaurantDetail = styled.div`

`;
