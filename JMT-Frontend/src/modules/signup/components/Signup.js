import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Auth } from 'actions';
import { Link } from 'react-router-dom';
import { Loader, InputTextField, Button } from 'components';
import inputValidator from 'utils/input-validator';
import { colors } from 'constants';

@connect(state => ({
  app: state.App,
}))
class Signup extends Component {
  state = {
    displayName: '',
    password: '',
    passwordConfirm: '',
    email: '',
    errorMessages: {},
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    return this.setState({ [name]: value });
  }

  signup = () => {
    const { dispatch } = this.props;
    const {
      displayName,
      password,
      passwordConfirm,
      email,
    } = this.state;

    this.initializeErrorMessages();
    const errorMessages = this.validateInputs(email, displayName, password, passwordConfirm);

    if (!this.isInputValidationPassed(errorMessages)) {
      return this.setState({ errorMessages });
    }

    return dispatch(Auth.signup({
      displayName,
      password,
      passwordConfirm,
      email,
    }))
      .then(res => console.log('res = ', res));
  }

  isInputValidationPassed = (errorObject) => {
    return Object.keys(errorObject).length === 0;
  }

  initializeErrorMessages = () => {
    return this.setState({ errorMessages: {} });
  }

  validateInputs = (email, displayName, password, passwordConfirm) => {
    const errorMessages = {};

    if (inputValidator.isEmpty(email)) {
      errorMessages.email = 'Email is required';
    } else if (!inputValidator.isEmail(email)) {
      errorMessages.email = 'Invalid Email Address';
    }

    if (inputValidator.isEmpty(password)) {
      errorMessages.password = 'Password is required';
    } else if (!inputValidator.isPassword(password)) {
      errorMessages.password = '6 - 20 characters: letters, numbers, special characters';
    } else if (password !== passwordConfirm) {
      errorMessages.password = 'Password should be matched';
      errorMessages.passwordConfirm = 'Password should be matched';
    }

    if (inputValidator.isEmpty(passwordConfirm)) {
      errorMessages.passwordConfirm = 'This field is required';
    }

    if (inputValidator.isEmpty(displayName)) {
      errorMessages.displayName = 'Name is required';
    } else if (!inputValidator.isDisplayName(displayName)) {
      errorMessages.displayName = '3 - 12 characters: letters, numbers';
    }

    return errorMessages;
  }

  render() {
    const { app } = this.props;
    const {
      displayName,
      password,
      passwordConfirm,
      email,
      errorMessages,
    } = this.state;

    if (app.isLoading) {
      return <Loader />;
    }

    return (
      <StyledSignupContainer>
        <StyledHeader>SIGN UP</StyledHeader>
        <StyledInputWrapper>
          <InputTextField
            label="Email"
            name="email"
            value={email}
            onChange={this.onChangeHandler}
            hasError={errorMessages.email}
          />
          { errorMessages.email && <StyledErrorMessage>{errorMessages.email}</StyledErrorMessage> }
        </StyledInputWrapper>

        <StyledInputWrapper>
          <InputTextField
            label="Name"
            name="displayName"
            value={displayName}
            onChange={this.onChangeHandler}
            hasError={errorMessages.displayName}
          />
          { errorMessages.displayName && <StyledErrorMessage>{errorMessages.displayName}</StyledErrorMessage> }
        </StyledInputWrapper>

        <StyledInputWrapper>
          <InputTextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.onChangeHandler}
            hasError={errorMessages.password}
          />
          { errorMessages.password && <StyledErrorMessage>{errorMessages.password}</StyledErrorMessage> }
        </StyledInputWrapper>

        <StyledInputWrapper>
          <InputTextField
            label="Password Confirm"
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={this.onChangeHandler}
            hasError={errorMessages.passwordConfirm}
          />
          { errorMessages.passwordConfirm && <StyledErrorMessage>{errorMessages.passwordConfirm}</StyledErrorMessage> }
        </StyledInputWrapper>
        <Button
          onClick={this.signup}
          className="btn-signup"
        >
          Signup
        </Button>
        <StyledFooter>
          <StyledFooterText to="/login">
            Login
          </StyledFooterText>
          <StyledFooterText to="/forgot-password">
            Forgot password?
          </StyledFooterText>
        </StyledFooter>
      </StyledSignupContainer>
    );
  }
}

export default Signup;

const StyledSignupContainer = styled.div`
  padding: 15px;

  .signup-arrow {
    span {
      background-color: ${colors.black};
    }
  }

  .btn-signup {
    margin-top: 35px;
  }
`;

const StyledHeader = styled.div`
  font-size: 32px;
  margin-top: 30px;
  color: ${colors.black};
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

const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledFooterText = styled(({ className, children, ...rest }) => (
  <Link className={className} {...rest}>
    {children}
  </Link>
))`
  color: ${colors.theme};
  margin-top: 10px;
  float: right;
  display: block;
`;
