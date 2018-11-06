import React, { Component } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import { colors } from 'utils/colors';

class NotFound extends Component {
  render() {
    return (
      <StyledDiv>
        <StyledTopText>404</StyledTopText>
        <StyledMiddleText>PAGE NOT</StyledMiddleText>
        <StyledBottomText>FOUND</StyledBottomText>
        <Button to="/" className="button">GO HOME</Button>
      </StyledDiv>
    );
  }
}

export default NotFound;

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.theme};

  .button {
    width: 50%;
    margin-top: 60px;
  }
`;

const StyledTopText = styled.div`
  font-size: 60px;
`;

const StyledMiddleText = styled.div`
  font-size: 40px;
`;

const StyledBottomText = styled.div`
  font-size: 40px;
`;
