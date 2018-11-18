import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Auth } from 'actions';
import { Loader } from 'components';
import { withCookies, Cookies } from 'react-cookie';

@withCookies
@withRouter
@connect(state => ({
  app: state.App,
}))
class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  componentWillMount = () => {
    const { history } = this.props;

    if (this.getTokenFromCookie()) {
      return history.push('/main');
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

export default Login;

const StyledInput = styled.input`
  border-color: lightgrey;
`;
