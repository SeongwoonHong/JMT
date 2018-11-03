import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Auth } from 'actions';

class Signup extends Component {
  state = {
    displayName: '',
    password: '',
    passwordConfirm: '',
    email: '',
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  signup = () => {
    const { dispatch } = this.props;

    dispatch(Auth.signup(this.state))
      .then((res) => console.log('res = ', res))
  }

  render() {
    const {
      displayName,
      password,
      passwordConfirm,
      email
    } = this.state;

    return (
      <div>
        <div>
          display name: <StyledInput
            name="displayName"
            value={displayName}
            onChange={this.onChangeHandler}
          />
        </div>
        <div>
          password: <StyledInput
            name="password"
            value={password}
            onChange={this.onChangeHandler}
          />
        </div>
        <div>
          password confirm: <StyledInput
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={this.onChangeHandler}
          />
        </div>
        <div>
          email: <StyledInput
            name="email"
            value={email}
            onChange={this.onChangeHandler}
          />
        </div>
        <button onClick={this.signup}>Signup</button>
      </div>
    );
  }
}

export default connect()(Signup);

const StyledInput = styled.input`
  border-color: lightgrey;
`;
