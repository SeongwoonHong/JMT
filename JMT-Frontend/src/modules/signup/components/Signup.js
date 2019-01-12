import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Auth } from 'actions';
import { Link } from 'react-router-dom';
import { Loader, InputTextField, Button } from 'components';
import inputValidator from 'utils/input-validator';
import { colors, defaultProfilePicture } from 'constants';
import getURLSearchParams from 'utils/get-url-params';

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

  signup = () => {
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

  sendEmail = () => {
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
      <StyledSignupContainer>
        <StyledInputWrapper>
          <InputTextField
            label="Email"
            name="email"
            value={email}
            onChange={this.onChangeHandler}
            hasError={errorMessages.email}
            disabled
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
        <StyledInputWrapper>
          <InputTextField
            label="profile picture"
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
          onClick={this.signup}
          className="btn-signup"
        >
          Signup
        </Button>
      </StyledSignupContainer>
    );
  }

  renderSendEmail = () => {
    const { email, errorMessages } = this.state;

    return (
      <StyledSignupContainer>
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

        <Button
          onClick={this.sendEmail}
          className="btn-signup"
        >
          Send Email
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

  render() {
    const { app } = this.props;
    const {
      isTokenVerified,
      isEmailSent,
    } = this.state;

    if (app.isLoading) {
      return <Loader />;
    }

    if (isEmailSent) {
      return (
        <StyledSignupContainer>
          Please check your email boi!
        </StyledSignupContainer>
      );
    }

    return (
      <StyledSignupContainer>
        <StyledHeader>SIGN UP</StyledHeader>
        {
          isTokenVerified ? this.renderSignup() : this.renderSendEmail()
        }
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
