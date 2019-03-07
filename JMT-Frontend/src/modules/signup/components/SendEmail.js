import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, InputTextField } from 'components';
import { colors } from 'constants';

const SendEmail = ({
  email,
  errorMessages,
  sendEmail,
  onChange,
}) => {
  return (
    <StyledSendEmailContainer onSubmit={sendEmail}>
      <StyledInputWrapper>
        <InputTextField
          label="Email"
          name="email"
          value={email}
          onChange={onChange}
          hasError={errorMessages.email}
          required
        />
        { errorMessages.email && <StyledErrorMessage>{errorMessages.email}</StyledErrorMessage> }
      </StyledInputWrapper>

      <Button
        className="btn-signup"
      >
        Send Email
      </Button>
      <StyledFooterText to="/login">
        Login
      </StyledFooterText>
    </StyledSendEmailContainer>
  );
};

export default SendEmail;

const StyledSendEmailContainer = styled.form`
  padding: 15px;

  .btn-signup {
    margin-top: 35px;
  }
`;

const StyledInputWrapper = styled.div`
  position: relative;
  margin-top: 30px;
`;

const StyledErrorMessage = styled.div`
  color: ${colors.theme};
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  font-size: 12px;
`;

const StyledFooterText = styled(({ className, children, ...rest }) => (
  <Link className={className} {...rest}>
    {children}
  </Link>
))`
  color: ${colors.theme};
  margin: 10px;
  float: right;
  display: block;
`;
