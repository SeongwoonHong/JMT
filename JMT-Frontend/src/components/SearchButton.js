import React, { Component } from 'react';
import styled from 'styled-components';

class SearchButton extends Component {

  render() {
  
    return ( 
      <StyledSearchButton>
        <ButtonText>Search</ButtonText>
      </StyledSearchButton>
    );
  }
}

const StyledSearchButton = styled.div`
  width: 327px;
  height: 54px;
  background-image: linear-gradient(to right ,rgb(244,123,66), rgb(246,54,64));
  box-shadow: 0 3px 5px 0 rgba(0,0,0,0.16);
  border-radius: 12px;
`;

const ButtonText = styled.div`
  padding: 15px 135px;
  color: rgb(255,255,255);
  font-size: 18px;
  font-family: "Open Sans", Arial, sans-serif;
  font-weight: 400;
  letter-spacing: -0.3px;
`;

export default SearchButton;
