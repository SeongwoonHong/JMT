import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { App, Restaurant } from 'actions';
import Header from 'components/Header';
import Loader from 'components/Loader';

import Map from './Map';
import RestaurantList from './RestaurantList';

@connect(state => ({
  restaurants: state.Restaurants,
  app: state.App
}))
@withRouter
class Main extends React.Component {
  state = {
    currentLocation: {
      lat: 43.653225, // by default, it's set to toronto in case a user denied to get current location
      lng: -79.383186, // by default, it's set to toronto in case a user denied to get current location
      isUserAllowed: false,
    },
  }

  componentDidMount = () => {
    const { dispatch, location } = this.props;
    const params = new URLSearchParams(location.search);
    const paramCuisines = params.get('cuisines');
    const paramLocation = params.get('location');
    const paramLat = params.get('latitude');
    const paramLong = params.get('longitude');

    dispatch(Restaurant.searchRestaurant({
      cuisines: paramCuisines === 'All' ? 'Restaurant' : paramCuisines,
      latitude: paramLat,
      longitude: paramLong,
      location: paramLocation,
    }));
  }

  getCurrentLocation = () => {
    const location = window.navigator && window.navigator.geolocation;
    const { dispatch } = this.props;

    dispatch(App.loadingStart());

    return new Promise((resolve) => {
      if (location) {
        return location.getCurrentPosition((position) => {
          this.setState({
            currentLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              isUserAllowed: true,
            }
          }, () => {
            dispatch(App.loadingDone());
            resolve(this.state.currentLocation);
          });
        }, () => {
          dispatch(App.loadingDone());
          resolve(this.state.currentLocation);
        });
      }

      return resolve('cannot get location');
    });
  }

  restaurantOnClickHandler = (id) => {
    this.props.history.push(`/main/restaurant-detail?id=${id}`);
  }

  renderView = () => {
    const { restaurants, app } = this.props;
    const { currentLocation } = this.state;

    if (app.view === 'map') {
      return (
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC50Sb3U7clyt4_TT36sj40NIXdTUaQc_E" // this key can be exposed
          loadingElement={<Loader />}
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          restaurants={restaurants.list}
          lat={currentLocation.lat}
          lng={currentLocation.lng}
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
    const { currentLocation } = this.state;

    if (app.isLoading) {
      return <Loader />;
    }

    return (
      <StyledDiv>
        <Header
          currentLocation={currentLocation}
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
