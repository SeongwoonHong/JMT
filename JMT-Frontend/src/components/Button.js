import React from 'react';
import styled from 'styled-components';
import { colors } from 'constants';
import { Link } from 'react-router-dom';

const Button = ({
  className,
  onClick,
  children,
  style,
  ...rest,
}) => {
  return (
    <StyledButton
      className={className}
      onClick={onClick}
      style={style}
      {...rest}
    >
      <StyledButtonText>{children}</StyledButtonText>
    </StyledButton>
  );
};

const StyledButton = styled(({ className, children, ...rest }) => rest.to ?
  (
    <Link className={className} {...rest}>
      {children}
    </Link>
  )
  :
  (
    <button className={className} {...rest}>
      {children}
    </button>
  )
)`
  width: 100%;
  height: 54px;
  background-image: ${colors.themeWithGradient};
  box-shadow: 0 3px 5px 0 rgba(0,0,0,0.16);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

const StyledButtonText = styled.div`
  color: ${colors.white};
  font-size: 18px;
`;

export default Button;
