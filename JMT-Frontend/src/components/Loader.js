import React, { Component } from 'react';
import styled from 'styled-components';

class Loader extends Component {
  render() {
    return (
      <StyledLoader id="bouncing-loader">
        <div />
        <div />
        <div />
      </StyledLoader>
    );
  }
}

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  
  > div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: #8385aa;
    border-radius: 50%;
    animation: bouncing-loader 0.6s infinite alternate;
  }

  > div:nth-child(2) {
    animation-delay: 0.2s;
  }

  > div:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bouncing-loader {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0.1;
      transform: translateY(-1rem);
    }
  }
`;

export default Loader;
