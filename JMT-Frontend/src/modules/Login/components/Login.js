import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Auth } from 'actions';
import Loader from 'components/Loader';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    return this.setState({ [name]: value });
  }

  login = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    return dispatch(Auth.login({ email, password }));
  }

  render() {
    const { app } = this.props;
    const { email, password } = this.state;

    if (app.isLoading) {
      return <Loader />;
    }

    return (
      <div>
        <div>
          <div>Email</div>
          <StyledInput
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.onChangeHandler}
          />
        </div>
        <div>
          <div>Password</div>
          <StyledInput
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={this.onChangeHandler}
          />
        </div>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default connect(state => ({
  app: state.App,
}))(Login);

const StyledInput = styled.input`
  border-color: lightgrey;
`;
