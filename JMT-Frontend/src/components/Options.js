import React from 'react';
import styled from 'styled-components';
import { colors } from 'constants';

const Options = ({
  className,
  style,
  label,
  text,
  onClick,
  innerRef,
}) => {
  return (
    <StyledBorder
      className={className}
      style={style}
      onClick={onClick}
      innerRef={innerRef}
    >
      <StyledLabel>{label}</StyledLabel>
      <StyledSelectOptions>{text}</StyledSelectOptions>
    </StyledBorder>
  );
};

const StyledBorder = styled.div`
  margin: 0 24px;
  border-bottom: solid 1px rgb(229,229,229);
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

