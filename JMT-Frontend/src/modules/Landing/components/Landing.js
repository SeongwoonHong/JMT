import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';
import animate from 'gsap-promise';
import Button from 'components/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { App } from 'actions';
import Loader from 'components/Loader';

@connect(state => ({
  app: state.App,
}))
@withRouter
class Landing extends Component {
  componentDidMount = () => {
    this.animateIn();
  }

  animateIn = () => {
    const btnEl = document.getElementById('searchBtn');
    const animateOption = {
      autoAlpha: 1,
      y: '0px',
    };

    animate.set(btnEl, { y: '-20px', autoAlpha: 0 });
    animate.from(this.circle, 1, { scale: 7, ease: Quad.easeInOut, delay: 0.5 })
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

  renderLoader = () => {
    const { app } = this.props;

    if (app.isLoading) {
      return <Loader />;
    }

    return null;
  }

  render() {
    return (
      <StyledDiv>
        <StyledBackgroundOverlay
          innerRef={el => this.circle = el}
        />
        <StyledText innerRef={el => this.finderText = el}>Restaurant Finder</StyledText>
        <Button
          className="search-button"
          id="searchBtn"
          onClick={this.search}
        >
          Search
        </Button>
        {this.renderLoader()}
      </StyledDiv>
    );
  }
}

export default Landing;

const StyledDiv = styled.div`
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

const StyledText = styled.div`
  color: #fff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 150px;
`;
