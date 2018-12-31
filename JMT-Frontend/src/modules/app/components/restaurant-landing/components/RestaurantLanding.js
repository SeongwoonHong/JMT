import React, { Component } from 'react';
import styled from 'styled-components';
import animate from 'gsap-promise';
import { Button, Loader, Options } from 'components';
import { connect } from 'react-redux';
import { App, Restaurant } from 'actions';
import TransitionGroup from 'react-transition-group-plus';
import { toast } from 'react-toastify';
import { cuisineOptions, locationOptions, headerHeight } from 'constants';

import Dropdown from './Dropdown';
import EnterLocation from './EnterLocation';

@connect(state => ({
  app: state.App,
}))
class Landing extends Component {
  state = {
    isDropdownOpened: false,
    cuisinesText: 'All',
    locationText: 'Select Location',
    currentLocation: {},
    dropdownItems: [],
    dropdownMode: null,
    isEnterLocationVisible: false,
  }

  componentDidMount = () => {
    // this.animateIn(); for now, I disable this
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

  animateIn = () => {
    const btnEl = document.getElementById('searchBtn');
    const animateOption = {
      autoAlpha: 1,
      y: '0px',
    };

    animate.set([this.cuisines, this.location], { y: '-20px', autoAlpha: 0 });
    animate.set(btnEl, { y: '-20px', autoAlpha: 0 });
    animate.set(this.circle, { scale: 7 });
    animate.to(this.circle, 1, { scale: 0.75, ease: Quad.easeInOut, delay: 0.5 })
      .then(() => animate.to(this.circle, 0.5, { scale: 1, ease: Quad.easeInOut }))
      .then(() => {
        animate.all([
          animate.to([this.cuisines, this.location], 1, animateOption),
          animate.to(btnEl, 1, animateOption),
        ]);
      });
  }

  search = () => {
    const { dispatch } = this.props;
    const {
      cuisinesText,
      locationText,
      currentLocation: {
        lat,
        lng,
      },
    } = this.state;

    if (locationText === 'Select Location') {
      return toast.info('You need to select location to search');
    }

    return dispatch(Restaurant.searchRestaurant({
      cuisines: cuisinesText === 'All' ? 'restaurants' : cuisinesText,
      location: locationText === 'Current Location' ? '' : locationText,
      latitude: lat,
      longitude: lng,
    }));
  }

  openDropdown = () => {
    this.setState({ isDropdownOpened: true });
  }

  openEnterLocation = () => {
    this.setState({ isEnterLocationVisible: true });
  }

  closeDropdown = () => {
    this.setState({ isDropdownOpened: false });
  }

  closeEnterLocation = (location) => {
    this.setState({
      isEnterLocationVisible: false,
      locationText: location,
    });
  }

  dropdownClickHandler = (mode, selectedItem) => {
    this.closeDropdown();

    if (mode === 'cuisines') {
      this.setState({ cuisinesText: selectedItem });
    } else {
      this.setState({ locationText: selectedItem });
    }

    if (selectedItem === 'Current Location') {
      return this.getCurrentLocation();
    }

    if (selectedItem === 'Enter Location') {
      return this.openEnterLocation();
    }

    return false;
  }

  optionClickHandler = (mode) => {
    this.openDropdown();

    if (mode === 'cuisines') {
      return this.setState({
        dropdownItems: cuisineOptions,
        dropdownMode: 'cuisines',
      });
    }

    return this.setState({
      dropdownItems: locationOptions,
      dropdownMode: 'location',
    });
  }

  renderLoader = () => {
    const { app } = this.props;

    if (app.isLoading) {
      return <Loader />;
    }

    return null;
  }

  render() {
    const {
      cuisinesText,
      locationText,
      isDropdownOpened,
      dropdownItems,
      dropdownMode,
      isEnterLocationVisible,
    } = this.state;

    return (
      <StyledLanding>
        <Options
          onClick={() => this.optionClickHandler('cuisines')}
          text={cuisinesText}
          label="Cuisines"
          innerRef={el => this.cuisines = el}
          className="cuisines-text"
        />
        <Options
          onClick={() => this.optionClickHandler('location')}
          text={locationText}
          label="Location"
          innerRef={el => this.location = el}
        />
        <TransitionGroup>
          {
            isDropdownOpened &&
            <Dropdown
              mode={dropdownMode}
              items={dropdownItems}
              onClickHandler={this.dropdownClickHandler}
            />
          }
        </TransitionGroup>
        {
          isEnterLocationVisible &&
          <EnterLocation
            close={this.closeEnterLocation}
          />
        }
        <Button
          className="search-button"
          id="searchBtn"
          onClick={this.search}
        >
          Search
        </Button>
        {this.renderLoader()}
      </StyledLanding>
    );
  }
}

export default Landing;

const StyledLanding = styled.div`
  width: 100vw;
  height: calc(100vh - ${headerHeight}px);
  position: relative;
  overflow: hidden;

  .cuisines-text {
    margin-top: 150px;
  }

  .search-button {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
  }
`;
