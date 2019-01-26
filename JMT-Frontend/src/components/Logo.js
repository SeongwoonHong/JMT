import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'constants';
import logo from 'assets/logo.png';

class Logo extends Component {
  render() {
    const {
      width,
      height
    } = this.props;

    return (
      <StyledLogoContainer
        width={width}
        height={height}
      >
        <img src={logo} alt="" />
      </StyledLogoContainer>
    );
  }
}

export default Logo;

const StyledLogoContainer = styled.div`
  background-image: ${colors.themeWithGradient};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  border-radius: 50%;
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 50%;
    height: 50%;
  }
`;
