import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/Button';

@withRouter
class EmailVerified extends Component {
  onClickHandler = () => {
    const { history } = this.props;

    return history.push('/login');
  }

  render() {
    return (
      <StyledDiv>
        <StyledText>Your email has been verified</StyledText>
        <Button onClick={this.onClickHandler} className="button">LOGIN</Button>
      </StyledDiv>
    );
  }
}

export default EmailVerified;

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .button {
    width: 50%;
    margin-top: 20px;
  }
`;

const StyledText = styled.div`
  font-size: 24px;
`;
