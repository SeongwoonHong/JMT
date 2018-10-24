import React from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';
import styled from 'styled-components';
import { Restaurant } from 'actions';

import RestaurantList from './components/RestaurantList';

class Main extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;

    dispatch(Restaurant.getRestaurantNearby());
  }

  render() {
    const { restaurants, view } = this.props;

    return (
      <StyledDiv>
        <Header />
        {
          view === 'map'
          ?
            <div>map...</div>
          :
            <RestaurantList restaurants={restaurants.data} />
        }
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
