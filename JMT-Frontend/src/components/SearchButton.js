import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';

class SearchButton extends Component {
  render() {
    return (
      <StyledSearchButton
        className={this.props.className}
        onClick={this.props.onClick}
      >
        <StyledButtonText>Search</StyledButtonText>
      </StyledSearchButton>
    );
  }
}

const StyledSearchButton = styled.div`
  width: 100%;
  height: 54px;
  background-image: linear-gradient(to right ,rgb(244,123,66), rgb(246,54,64));
  box-shadow: 0 3px 5px 0 rgba(0,0,0,0.16);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButtonText = styled.div`
  color: ${colors.white};
  font-size: 18px;
`;

export default SearchButton;
