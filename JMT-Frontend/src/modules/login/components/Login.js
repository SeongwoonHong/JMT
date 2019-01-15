import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Auth } from 'actions';
import { Link, withRouter } from 'react-router-dom';
import { Loader, InputTextField, Button } from 'components';
import { withCookies, Cookies } from 'react-cookie';
import inputValidator from 'utils/input-validator';
import history from 'utils/history';
import { colors } from 'constants';

@withRouter
@withCookies
@connect(state => ({
  app: state.App,
}))
class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessages: {},
  };

  componentWillMount = () => {
    if (this.getTokenFromCookie()) {
      return history.push('/');
    }

    return false;
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    return this.setState({ [name]: value });
  }

  getTokenFromCookie = () => {
    const cookies = new Cookies();
    const token = cookies.get('JMT_AUTH_TOKEN');

    return token;
  }

  login = () => {
    const { dispatch, location: { state } } = this.props;
    const { email, password } = this.state;
    const errorMessages = this.validateInputs(email, password);
    let reRoute = '/';

    this.initializeErrorMessages();
    if (!this.isInputValidationPassed(errorMessages)) {
      return this.setState({ errorMessages });
    }

    if (state) {
      reRoute = state.prevRoute;
    }

    return dispatch(Auth.login({ email, password }, reRoute));
  }


  isInputValidationPassed = (errorObject) => {
    return Object.keys(errorObject).length === 0;
  }

  initializeErrorMessages = () => {
    return this.setState({ errorMessages: {} });
  }

  validateInputs = (email, password) => {
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
    }

    return errorMessages;
  }

  renderLoader = () => {
    const { app } = this.props;

    if (app.isLoading) {
      return <Loader />;
    }

    return null;
  }

  render() {
    const { email, password, errorMessages } = this.state;

    return (
      <StyledLoginContainer>
        <StyledHeader>LOGIN</StyledHeader>

        <StyledInputWrapper>
          <InputTextField
            label="Email"
            name="email"
            value={email}
            onChange={this.onChangeHandler}
            hasError={errorMessages.email}
            required
          />
          { errorMessages.email && <StyledErrorMessage>{errorMessages.email}</StyledErrorMessage> }
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
        <Button
          onClick={this.login}
          className="btn-login"
        >
          Login
        </Button>
        <StyledFooterText to="/signup">
          Don't have an account? Sign up
        </StyledFooterText>
        <StyledFooterText to="/forgot-password">
          Forgot password?
        </StyledFooterText>
        {this.renderLoader()}
      </StyledLoginContainer>
    );
  }
}

export default Login;

const StyledLoginContainer = styled.div`
  padding: 15px;

  .login-arrow {
    span {
      background-color: ${colors.black};
    }
  }

  .btn-login {
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
