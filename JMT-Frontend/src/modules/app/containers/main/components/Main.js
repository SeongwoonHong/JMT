import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Restaurant } from 'actions';
import { Header, Loader } from 'components';

import Map from './Map';
import RestaurantList from './RestaurantList';

@connect(state => ({
  restaurants: state.Restaurants,
  app: state.App
}))
@withRouter
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisines: this.getParamsFromString(this.props.location.search, 'cuisines'),
      location: this.getParamsFromString(this.props.location.search, 'location'),
      latitude: this.getParamsFromString(this.props.location.search, 'latitude'),
      longitude: this.getParamsFromString(this.props.location.search, 'longitude'),
      price: this.getParamsFromString(this.props.location.search, 'price'),
      sort_by: this.getParamsFromString(this.props.location.search, 'sort_by'),
    };
  }

  componentDidMount = () => {
    const { dispatch, restaurants } = this.props;
    const {
      cuisines,
      location,
      latitude,
      longitude,
      price,
      sort_by,
    } = this.state;

    if (restaurants.list.length) return;

    dispatch(Restaurant.searchRestaurant({
      cuisines: cuisines === 'All' ? 'Restaurant' : cuisines,
      latitude,
      longitude,
      location,
      price,
      sort_by,
    }));
  }

  /**
   * when filtered from filter modal
   */
  componentWillReceiveProps = (nextProps) => {
    const { dispatch } = this.props;
    const {
      cuisines,
      location,
      latitude,
      longitude,
    } = this.state;
    if (nextProps.location.search !== this.props.location.search) {
      const price = this.getParamsFromString(nextProps.location.search, 'price');
      const sort_by = this.getParamsFromString(nextProps.location.search, 'sort_by'); // eslint-disable-line

      return dispatch(Restaurant.searchRestaurant({
        cuisines,
        latitude,
        longitude,
        location,
        price,
        sort_by,
      }, false));
    }

    return null;
  }

  getParamsFromString = (str, param) => {
    const params = new URLSearchParams(str);

    return params.get(param);
  }

  restaurantOnClickHandler = (id) => {
    this.props.history.push(`/main/restaurant-detail?id=${id}`);
  }

  renderView = () => {
    const { restaurants, app } = this.props;
    const { latitude, longitude } = this.state;

    if (app.view === 'map') {
      return (
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC50Sb3U7clyt4_TT36sj40NIXdTUaQc_E" // this key can be exposed
          loadingElement={<Loader />}
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          restaurants={restaurants.list}
          restaurantOnClickHandler={this.restaurantOnClickHandler}
          lat={Number(latitude) || 43.653225} // by default, it's toronto downtown
          lng={Number(longitude) || -79.383186} // by default, it's toronto downtown
        />
      );
    }

    return (
      <RestaurantList
        restaurants={restaurants.list}
        onClick={this.restaurantOnClickHandler}
      />
    );
  }

  render() {
    const { app } = this.props;
    const { location, latitude, longitude } = this.state;

    if (app.isLoading) {
      return <Loader />;
    }

    return (
      <StyledDiv>
        <Header
          restaurantLocation={location || 'Current Location'}
          latitude={latitude}
          longitude={longitude}
        />
        {this.renderView()}
        {/* {
          alert.isVisible &&
          <div>
            <div>Alert message = {alert.msg}</div>
            <div>Alert type = {alert.type}</div>
          </div>
        } */}
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
`;

export default Main;
