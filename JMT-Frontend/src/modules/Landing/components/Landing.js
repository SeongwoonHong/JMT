import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';
import animate from 'gsap-promise';
import Button from 'components/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { App } from 'actions';
import Loader from 'components/Loader';
import TransitionGroup from 'react-transition-group-plus';
import logo from 'assets/logo.png';
import Options from 'components/Options';

import Dropdown from './Dropdown';

const cuisinesOptions = ['All', 'African Restaurant', 'Afghan Restaurant', 'American Restaurant', 'Asian Restaurant', 'Something Restaurant', 'Something2 Restaurant', 'Something3 Restaurant', 'Something4 Restaurant'];
const locationOptions = ['Near By', 'Enter Location'];

@connect(state => ({
  app: state.App,
}))
@withRouter
class Landing extends Component {
  state = {
    isDropdownOpened: false,
    cuisinesText: 'All',
    locationText: 'Select Location',
    dropdownItems: [],
    dropdownMode: null,
  }

  componentDidMount = () => {
    this.animateIn();
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
    const { dispatch, history } = this.props;

    dispatch(App.loadingStart());

    /**
     * temporarily
     */
    setTimeout(() => {
      dispatch(App.loadingDone());
      history.push('/main');
    }, 2000);
  }

  openDropdown = () => {
    this.setState({ isDropdownOpened: true });
  }

  closeDropdonw = () => {
    this.setState({ isDropdownOpened: false });
  }

  dropdownClickHandler = (mode, selectedItem) => {
    this.closeDropdonw();

    if (mode === 'cuisines') {
      this.setState({ cuisinesText: selectedItem });
    } else {
      this.setState({ locationText: selectedItem });
    }
    if (selectedItem === 'Enter Location') {
      return console.log('enter location!');
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
