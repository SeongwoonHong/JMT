import React, { Component } from 'react';
import styled from 'styled-components';
import { InputTextField, Button, Loader } from 'components';
import { colors } from 'constants';
import inputValidator from 'utils/input-validator';
import { User, Auth } from 'actions';
import { connect } from 'react-redux';
import getURLSearchParams from 'utils/get-url-params';
import { toast } from 'react-toastify';

@connect(state => ({
  app: state.App,
}))
class ForgotPassword extends Component {
  state = {
    email: '',
    errorMessages: {},
    isEmailSent: false,
    password: '',
    passwordConfirm: '',
    isTokenVerified: false,
  };

  componentWillMount = () => {
    const token = getURLSearchParams(this.props.location.search, 't');
    const { dispatch } = this.props;

    if (!token) {
      return false;
    }

    return dispatch(Auth.tokenDecode(token))
      .then(() => {
        this.setState({ isTokenVerified: true });
      });
  }

  onChangeHandler = (e) => {
    return this.setState({ [e.target.name]: e.target.value });
  }

  sendEmail = () => {
    const { email } = this.state;
    const { dispatch } = this.props;

    this.initializeErrorMessages();
    const errorMessages = this.validateEmail(email);

    if (!this.isInputValidationPassed(errorMessages)) {
      return this.setState({ errorMessages });
    }

    return dispatch(User.sendResetPasswordEmail(email))
      .then((res) => {
        if (res.success) {
          return this.setState({ isEmailSent: true });
        }

        return toast.error('Account does not exist');
      });
  }

  resetPassword = () => {
    const { password, passwordConfirm } = this.state;
    const { dispatch } = this.props;
    const token = getURLSearchParams(this.props.location.search, 't');

    this.initializeErrorMessages();
    const errorMessages = this.validatePassword(password, passwordConfirm);

    if (!this.isInputValidationPassed(errorMessages)) {
      return this.setState({ errorMessages });
    }

    dispatch(User.updatePassword({ password, token }));

    return toast.success('Success!');
  }

  isInputValidationPassed = (errorObject) => {
    return Object.keys(errorObject).length === 0;
  }

  initializeErrorMessages = () => {
    return this.setState({ errorMessages: {} });
  }

  validateEmail = (email) => {
    const errorMessages = {};

    if (inputValidator.isEmpty(email)) {
      errorMessages.email = 'Email is required';
    } else if (!inputValidator.isEmail(email)) {
      errorMessages.email = 'Invalid Email Address';
    }

    return errorMessages;
  }

  validatePassword = (password, passwordConfirm) => {
    const errorMessages = {};

    if (inputValidator.isEmpty(password)) {
      errorMessages.password = 'Password is required';
    } else if (!inputValidator.isPassword(password)) {
      errorMessages.password = '6 - 20 characters: letters, numbers, special characters';
    } else if (password !== passwordConfirm) {
      errorMessages.password = 'Password should be matched';
      errorMessages.passwordConfirm = 'Password should be matched';
    }

    return errorMessages;
  }

  renderSendEmail = () => {
    const { email, errorMessages } = this.state;

    return (
      <StyledForgotPassword>
        <StyledTitle>Forgot your password?</StyledTitle>
        Enter your e-mail address and we'll send you a link to reset your password
        <StyledInputWrapper>
          <InputTextField
            type="text"
            name="email"
            label="Email"
            value={email}
            required
            onChange={this.onChangeHandler}
          />
          { errorMessages.email && <StyledErrorMessage>{errorMessages.email}</StyledErrorMessage> }
        </StyledInputWrapper>
        <Button
          className="btn-forgot-password"
          onClick={this.sendEmail}
        >
          Reset
        </Button>
      </StyledForgotPassword>
    );
  }

  renderAfterEmailSent = () => {
    return (
      <StyledForgotPassword>
        <StyledTitle>Check in your email!</StyledTitle>
        We just emailed you with the instructions to reset your password
      </StyledForgotPassword>
    );
  }

  renderResetPasswordWithToken = () => {
    const { password, passwordConfirm, errorMessages } = this.state;

    return (
      <StyledForgotPassword>
        <StyledTitle>Please enter your new password</StyledTitle>
        <StyledInputWrapper>
          <InputTextField
            type="password"
            name="password"
            label="Password"
            value={password}
            required
            onChange={this.onChangeHandler}
          />
          { errorMessages.password && <StyledErrorMessage>{errorMessages.password}</StyledErrorMessage> }
        </StyledInputWrapper>
        <StyledInputWrapper>
          <InputTextField
            type="password"
            name="passwordConfirm"
            label="Password Confirm"
            value={passwordConfirm}
            required
            onChange={this.onChangeHandler}
          />
          { errorMessages.passwordConfirm && <StyledErrorMessage>{errorMessages.passwordConfirm}</StyledErrorMessage> }
        </StyledInputWrapper>
        <Button
          className="btn-forgot-password"
          onClick={this.resetPassword}
        >
          Reset
        </Button>
      </StyledForgotPassword>
    );
  }

  render() {
    const { isEmailSent, isTokenVerified } = this.state;
    const { app } = this.props;

    if (app.isLoading) {
      return <Loader />;
    }

    if (isTokenVerified) {
      return this.renderResetPasswordWithToken();
    }

    if (isEmailSent) {
      return this.renderAfterEmailSent();
    }

    return this.renderSendEmail();
  }
}

export default ForgotPassword;

const StyledForgotPassword = styled.div`
  padding: 15px;

  .btn-forgot-password {
    margin-top: 35px;
  }
`;

const StyledTitle = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
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
