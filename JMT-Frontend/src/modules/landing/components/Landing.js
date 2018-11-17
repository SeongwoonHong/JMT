import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';
import animate from 'gsap-promise';
import Button from 'components/Button';
import { connect } from 'react-redux';
import { App, Restaurant } from 'actions';
import Loader from 'components/Loader';
import TransitionGroup from 'react-transition-group-plus';
import logo from 'assets/logo.png';
import Options from 'components/Options';

import Dropdown from './Dropdown';
import EnterLocation from './EnterLocation';

const cuisinesOptions = ['All', 'African Restaurant', 'Afghan Restaurant', 'American Restaurant', 'Asian Restaurant', 'Something Restaurant', 'Something2 Restaurant', 'Something3 Restaurant', 'Something4 Restaurant'];
const locationOptions = ['Near By', 'Enter Location'];

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
    this.animateIn();
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
      .then(() => animate.to([this.cuisines, this.location], 1, animateOption))
      .then(() => animate.to(btnEl, 1, animateOption));
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

    return dispatch(Restaurant.searchRestaurant({
      cuisines: cuisinesText,
      location: locationText === 'Near By' ? '' : locationText,
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

    if (selectedItem === 'Near By') {
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
        dropdownItems: cuisinesOptions,
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
        <StyledBackgroundOverlay
          innerRef={el => this.circle = el}
        />
        <StyledLogo>
          <img src={logo} alt="" />
          <div>Restaurant Finder</div>
        </StyledLogo>
        <Options
          onClick={() => this.optionClickHandler('cuisines')}
          text={cuisinesText}
          label="Cuisines"
          innerRef={el => this.cuisines = el}
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
  height: 100vh;
  position: relative;
  overflow: hidden;

  .search-button {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
  }
`;

const StyledBackgroundOverlay = styled.div`
  background-image: ${colors.themeWithGradient};
  width: 210px;
  height: 210px;
  border-radius: 50%;
  margin: 30px auto;
`;

const StyledLogo = styled.div`
  color: #fff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
`;
