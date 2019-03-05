import React from 'react';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

const SVGContainer = ({
  svg,
  className,
  onClick,
  style
}) => {
  return (
    svg
      ?
        <StyledSVGContainer
          className="svg-container"
          onClick={onClick}
          style={style}
        >
          <SVG
            src={svg}
            className={className}
          >
            <img src={svg} alt="" />
          </SVG>
        </StyledSVGContainer>
      : undefined
  );
};

export default SVGContainer;

const StyledSVGContainer = styled.span`
`;
