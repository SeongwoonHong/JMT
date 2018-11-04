import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';
import { Link } from 'react-router-dom';

class Button extends Component {
  render() {
    const {
      className,
      onClick,
      children,
      style,
      ...rest
    } = this.props;

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
  }
}

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
  background-image: linear-gradient(to right ,rgb(244,123,66), rgb(246,54,64));
  box-shadow: 0 3px 5px 0 rgba(0,0,0,0.16);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const StyledButtonText = styled.div`
  color: ${colors.white};
  font-size: 18px;
`;

export default Button;
