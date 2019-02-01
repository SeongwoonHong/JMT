import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'constants';
import { InputTextField, Button } from 'components';
import { connect } from 'react-redux';
import { User } from 'actions';
import inputValidator from 'utils/input-validator';

@connect(state => ({
  user: state.Auth.user
}))
class Profile extends Component {
  state = {
    email: this.props.user.email,
    password: '',
    passwordConfirm: '',
    displayName: this.props.user.displayName,
    errorMessages: {},
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    return this.setState({ [name]: value });
  }

  saveProfile = () => {
    const { dispatch } = this.props;
    const {
      displayName,
      password,
      passwordConfirm,
    } = this.state;

    this.initializeErrorMessages();
    const errorMessages = this.validateInputs(displayName, password, passwordConfirm);

    if (!this.isInputValidationPassed(errorMessages)) {
      return this.setState({ errorMessages });
    }

    return dispatch(User.updateProfile({
      displayName,
      password,
    }));
  }

  isInputValidationPassed = (errorObject) => {
    return Object.keys(errorObject).length === 0;
  }

  initializeErrorMessages = () => {
    return this.setState({ errorMessages: {} });
  }


  validateInputs = (displayName, password, passwordConfirm) => {
    const errorMessages = {};

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
    const {
      displayName,
      password,
      passwordConfirm,
      email,
      errorMessages,
    } = this.state;

    return (
      <StyledProfile>
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
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={this.onChangeHandler}
            hasError={errorMessages.passwordConfirm}
          />
          { errorMessages.passwordConfirm && <StyledErrorMessage>{errorMessages.passwordConfirm}</StyledErrorMessage> }
        </StyledInputWrapper>

        <Button
          className="profile-btn"
          onClick={this.saveProfile}
        >
          SAVE
        </Button>
      </StyledProfile>
    );
  }
}

export default Profile;

const StyledProfile = styled.div`
  .profile-btn {
    margin-top: 30px;
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
