import React from 'react';
import styled from 'styled-components';
import { colors } from 'constants';

const InputTextField = ({
  label,
  value,
  type = 'text',
  onChange,
  name,
  onBlur,
  hasError,
  disabled,
  className,
  required,
  ...rest,
}) => {
  return (
    <StyledInputTextField className={className}>
      <StyledLabel>
        { label }
        { required && <StyledAsterisk>*</StyledAsterisk> }
      </StyledLabel>
      <StyledInputContainer hasError={hasError}>
        <StyledInput
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          {...rest}
        />
      </StyledInputContainer>
    </StyledInputTextField>
  );
};

export default InputTextField;

const StyledInputTextField = styled.div`
  cursor: pointer;
`;

const StyledAsterisk = styled.span`
  color: ${colors.theme};
  vertical-align: middle;
  margin-left: 5px;
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

  ${props => props.disabled && `
    background-color: ${colors.lightGrey};
    opacity: 0.5;
    cursor: not-allowed;
  `};
`;
