import React from 'react';
import styled from 'styled-components';
import { colors } from 'constants';

const Loader = ({ isSmall }) => {
  return (
    <StyledLoader
      id="bouncing-loader"
      isSmall={isSmall}
    >
      <div />
      <div />
      <div />
    </StyledLoader>
  );
};

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  align-items: center;
  z-index: 10;
  position: absolute;
  top: 0;
  background-color: rgba(255,255,255,0.7);
  left: 0;
  ${props => props.isSmall && `
    position: relative;
    width: 100%;
    height: 100%;
  `};

  > div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: ${colors.theme};
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
