import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';

class EnterLocation extends Component {
  state = {
    location: 'Enter your Location',
  }

  onKeyDownHandler = (e) => {
    const enter = 13;

    if (e.keyCode === enter) {
      return this.close();
    }

    return false;
  }

  onChangeHandler = (e) => {
    return this.setState({ location: e.target.value });
  }

  close = () => {
    const { location } = this.state;

    this.props.close(location);
  }

  render() {
    const { location } = this.state;

    return (
      <StyledDiv>
        <StyledInput
          onKeyDown={this.onKeyDownHandler}
          onChange={this.onChangeHandler}
          value={location}
        />
      </StyledDiv>
    );
  }
}

export default EnterLocation;

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 13;
  background-color: ${colors.backgroundOverlay};
`;

const StyledInput = styled.input`
  color: ${colors.white};
  font-size: 34px;
  background-color: transparent;
  border: none;
  text-align: center;
`;
