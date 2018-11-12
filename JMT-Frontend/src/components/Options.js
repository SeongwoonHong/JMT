import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';

class Options extends Component {
  render() {
    const {
      className,
      style,
      label,
      text,
      onClick,
    } = this.props;

    return (
      <StyledBorder
        className={className}
        style={style}
        onClick={onClick}
      >
        <StyledLabel>{label}</StyledLabel>
        <StyledSelectOptions>{text}</StyledSelectOptions>
      </StyledBorder>
    );
  }
}

const StyledBorder = styled.div`
  margin: 0 24px;
  border-bottom: solid 1px rgb(229,229,229);
  width: 327px;
`;

const StyledLabel = styled.div`
  color: rgb(178,178,178);
  letter-spacing: -0.2px;
  font-size: 12px;
  text-align: center;
  padding: 14px 0 6px;
`;

const StyledSelectOptions = styled.div`
  color: ${colors.black};
  letter-spacing: 0.3px;
  font-size: 18px;
  text-align:center;
  padding: 0 0 14px;
 `;

export default Options;

