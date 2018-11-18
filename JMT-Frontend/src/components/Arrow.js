import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';

class Arrow extends Component {
  render() {
    return (
      <StyledArrow
        className={this.props.className}
        style={this.props.style}
        onClick={this.props.onClick}
      >
        <span />
        <span />
        <span />
        <span />
        <span />
      </StyledArrow>
    );
  }
}

export default Arrow;

const StyledArrow = styled.span`
  width: 25px;
  height: 25px;
  position: relative;
  display: inline-block;

  &.left {
    span:nth-child(4) {
      transform: rotate(-45deg);
    }

    span: nth-child(5) {
      transform: rotate(45deg);
    }
  }

  &.right {
    span:nth-child(1) {
      transform: rotate(-45deg);
    }

    span:nth-child(2) {
      transform: rotate(45deg);
    }
  }

  span {
    position: absolute;
    height: 3px;
    background-color: ${colors.white};

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      width: 12.5px;
      top: 12.5px;
    }

    &:nth-child(1) {
      right: 0;
      transform-origin: bottom right;
    }

    &:nth-child(2) {
      right: 0;
      transform-origin: top right;
    }

    &:nth-child(3) {
      width: 25px;
      top: 12.5px;
    }

    &:nth-child(4) {
      left: 0;
      transform-origin: bottom left;
    }

    &:nth-child(5) {
      left: 0;
      transform-origin: top left;
    }
  }
`;
