import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

class SVGContainer extends Component {
  render() {
    const {
      svg,
      className,
      onClick,
      style
    } = this.props;

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
  }
}

export default SVGContainer;

const StyledSVGContainer = styled.span`
`;
