import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'constants';

class InputTextField extends Component {
  render() {
    const {
      label,
      value,
      type = 'text',
      onChange,
      name,
      onBlur,
      hasError,
      disabled,
    } = this.props;

    return (
      <StyledInputTextField>
        <StyledLabel>{label}</StyledLabel>
        <StyledInputContainer hasError={hasError}>
          <StyledInput
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
          />
        </StyledInputContainer>
      </StyledInputTextField>
    );
  }
}

export default InputTextField;

const StyledInputTextField = styled.div`
`;

const StyledLabel = styled.label`
  font-size: 12px;
  color: ${colors.grey};
  display: block;
`;

const StyledInputContainer = styled.div`
  border-bottom: 1px solid ${props => props.hasError ? colors.theme : colors.inputBorder};
`;

const StyledInput = styled.input`
  font-size: 18px;
  color: ${colors.inputColor};
  background-color: ${props => props.disabled && colors.lightGrey};
  opacity: ${props => props.disabled && '0.5'};
`;
