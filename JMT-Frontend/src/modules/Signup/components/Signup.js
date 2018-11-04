import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Auth } from 'actions';
import Loader from 'components/Loader';

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
    const {
      displayName,
      password,
      passwordConfirm,
      email
    } = this.state;

    dispatch(Auth.signup({
      displayName,
      password,
      passwordConfirm,
      email
    }))
      .then((res) => console.log('res = ', res));
  }

  render() {
    const { app } = this.props;
    const {
      displayName,
      password,
      passwordConfirm,
      email
    } = this.state;

    if (app.isLoading) {
      return <Loader />;
    }

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
            type="password"
            value={password}
            onChange={this.onChangeHandler}
          />
        </div>
        <div>
          password confirm: <StyledInput
            name="passwordConfirm"
            type="password"
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

export default connect(state => ({
  app: state.App,
}))(Signup);

const StyledInput = styled.input`
  border-color: lightgrey;
`;
