import React, { Component } from 'react';
import styled from 'styled-components';

class Search extends Component {
  render() {
    const { value, onChange, onKeyDown } = this.props;

    return (
      <StyledDiv {...this.props}>
        <StyledIcon>Icon</StyledIcon>
        <StyledInput
          placeholder="Search for restaurants..."
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
        />
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  width: 100%;
`;

const StyledIcon = styled.div`
  width: 10%;
  display: inline-block;
`;

const StyledInput = styled.input`
  width: 80%;
  display: inline-block;
  border: none;

  &:active, &:focus {
    outline: none;
  }
`;

export default Search;
