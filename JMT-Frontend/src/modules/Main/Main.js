import React from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';
import styled from 'styled-components';
import { App, Restaurant } from 'actions';
import Loader from 'components/Loader';

import Map from './components/Map';
import RestaurantList from './components/RestaurantList';

class Main extends React.Component {
  state = {
    currentLocation: {
      lat: 43.653225, // by default, it's set to toronto in case a user denied to get current location
      lng: -79.383186, // by default, it's set to toronto in case a user denied to get current location
      isUserAllowed: false,
    },
  }

  componentDidMount = () => {
    const { dispatch } = this.props;

    this.getCurrentLocation()
      .then(currentLocation => dispatch(Restaurant.searchRestaurant({
        keyword: 'korean restaurants',
        latitude: currentLocation.lat,
        longitude: currentLocation.lng
      })))
      .catch(e => console.log(e)); // To Do - when it fails, we need to handle this properly
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

  renderView = () => {
    const { restaurants, app } = this.props;

    if (app.view === 'map') {
      return (
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC50Sb3U7clyt4_TT36sj40NIXdTUaQc_E" // this key can be exposed
          loadingElement={<Loader />}
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          restaurants={restaurants.data}
        />
      );
    }

    return (
      <RestaurantList restaurants={restaurants.data} />
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

export default connect(state => ({
  restaurants: state.Restaurants,
  app: state.App
}))(Main);
