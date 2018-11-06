import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';
import animate from 'gsap-promise';
import Button from 'components/Button';

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

    animate.set([btnEl, this.finderText], { y: '-20px', autoAlpha: 0 });
    animate.from(this.circle, 1, { scale: 7, ease: Quad.easeInOut })
      .then(() => animate.to(this.finderText, 0.5, animateOption))
      .then(() => animate.to(btnEl, 1, animateOption));
  }

  render() {
    return (
      <StyledDiv>
        <StyledBackgroundOverlay
          innerRef={el => this.circle = el}
        />
        <StyledText innerRef={el => this.finderText = el}>Restaurant Finder</StyledText>
        <Button className="search-button" id="searchBtn">Search</Button>
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
