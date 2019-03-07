import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Auth } from 'actions';
import { Loader, InputTextField, Button } from 'components';
import inputValidator from 'utils/input-validator';
import { colors, defaultProfilePicture } from 'constants';
import getURLSearchParams from 'utils/get-url-params';

import SendEmail from './SendEmail';

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
    isTokenVerified: false,
    isEmailSent: false,
    profilePicture: defaultProfilePicture
  }

  componentWillMount = () => {
    this.token = getURLSearchParams(this.props.location.search, 't');
    const { dispatch } = this.props;

    if (!this.token) {
      return false;
    }

    return dispatch(Auth.tokenDecode(this.token))
      .then((res) => {
        this.setState({ isTokenVerified: true, email: res.email });
      });
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    return this.setState({ [name]: value });
  }

  onFileChange = (e) => {
    const profilePicture = e.target.files[0];
    const form = new FormData();
    const reader = new FileReader();

    form.append('file', profilePicture);
    reader.readAsDataURL(profilePicture);

    return reader.onload = () => {
      return this.setState({ profilePicture: reader.result });
    };
  }

  signup = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const {
      displayName,
      password,
      passwordConfirm,
      email,
      profilePicture,
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
      profilePicture
    }, this.token));
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

  sendEmail = (e) => {
    e.preventDefault();

    const { email } = this.state;
    const errorMessages = {};

    if (inputValidator.isEmpty(email)) {
      errorMessages.email = 'Email is required';
    } else if (!inputValidator.isEmail(email)) {
      errorMessages.email = 'Invalid Email Address';
    }

    if (Object.keys(errorMessages).length) {
      return this.setState({ errorMessages });
    }

    this.setState({ isEmailSent: true });

    return Auth.sendSignupEmail(email);
  }

  renderSignup = () => {
    const {
      displayName,
      password,
      passwordConfirm,
      email,
      errorMessages,
    } = this.state;

    return (
      <StyledSignupContainer onSubmit={this.signup}>
        <StyledInputWrapper>
          <InputTextField
            label="Email"
            name="email"
            value={email}
            onChange={this.onChangeHandler}
            hasError={errorMessages.email}
            disabled
            required
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
            required
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
            required
          />
          { errorMessages.password && <StyledErrorMessage>{errorMessages.password}</StyledErrorMessage> }
        </StyledInputWrapper>

        <StyledInputWrapper>
          <InputTextField
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={this.onChangeHandler}
            hasError={errorMessages.passwordConfirm}
            required
          />
          { errorMessages.passwordConfirm && <StyledErrorMessage>{errorMessages.passwordConfirm}</StyledErrorMessage> }
        </StyledInputWrapper>
        <StyledInputWrapper>
          <InputTextField
            label="Profile picture"
            name="profilePicture"
            type="file"
            accept="image/*"
            className="profilePicture-field"
            onChange={this.onFileChange}
          />
        </StyledInputWrapper>
        {
          this.state.profilePicture && (
            <StyledImagePreview>
              <img src={this.state.profilePicture} alt="" />
            </StyledImagePreview>
          )
        }
        <Button
          className="btn-signup"
        >
          Signup
        </Button>
      </StyledSignupContainer>
    );
  }

  renderLoader = () => {
    const { app } = this.props;

    if (app.isLoading) {
      return <Loader />;
    }

    return null;
  }

  render() {
    const {
      isTokenVerified,
      isEmailSent,
      email,
      errorMessages,
    } = this.state;

    if (isEmailSent) {
      return (
        <StyledSignupContainer>
          We've sent you an email.
          Please check it out!
        </StyledSignupContainer>
      );
    }

    return (
      <React.Fragment>
        <StyledHeader>SIGN UP</StyledHeader>
        {
          isTokenVerified ? this.renderSignup() :
          <SendEmail
            email={email}
            errorMessages={errorMessages}
            sendEmail={this.sendEmail}
            onChange={this.onChangeHandler}
          />
        }
        {this.renderLoader()}
      </React.Fragment>
    );
  }
}

export default Signup;

const StyledSignupContainer = styled.form`
  padding: 15px;

  .signup-arrow {
    span {
      background-color: ${colors.black};
    }
  }

  .profilePicture-field {
    input {
      font-size: 14px;
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
  text-align: center;
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

const StyledImagePreview = styled.div`
  margin-top: 10px;
  border-left: 5px solid ${colors.lightGrey};
  border-right: 5px solid ${colors.lightGrey};
  border-top: 5px solid ${colors.lightGrey};
  border-bottom: 5px solid ${colors.lightGrey};

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: block;
    margin: 5px auto;
  }
`;
