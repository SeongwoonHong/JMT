import React from 'react';
import styled from 'styled-components';
import { SVGContainer } from 'components';
import searchSVG from 'assets/search.svg';

const Search = ({ value, onChange, onKeyDown }) => {
  return (
    <StyledDiv {...this.props}>
      <StyledIcon>
        <SVGContainer svg={searchSVG} />
      </StyledIcon>
      <StyledInput
        placeholder="Search for restaurants..."
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
      />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  width: 100%;
`;

const StyledIcon = styled.div`
  margin-right: 5px;
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
