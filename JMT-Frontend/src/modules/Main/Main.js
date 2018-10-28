import React from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';
import styled from 'styled-components';
import { Restaurant } from 'actions';

import Map from './components/Map';
import RestaurantList from './components/RestaurantList';

class Main extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;


    return dispatch(Restaurant.getRestaurantNearby());
  }

  renderView = () => {
    const { restaurants, view } = this.props;

    if (view === 'map') {
      return (
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC50Sb3U7clyt4_TT36sj40NIXdTUaQc_E" // this key can be exposed
          loadingElement={<div style={{ height: '100%' }}>Loading...</div>}
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
    return (
      <StyledDiv>
        <Header />
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
  view: state.App.view
}))(Main);
