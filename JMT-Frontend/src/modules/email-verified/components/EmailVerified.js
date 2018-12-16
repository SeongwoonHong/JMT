import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Loader } from 'components';
import getURLSearchParams from 'utils/get-url-params';
import { Auth } from 'actions';

@withRouter
@connect(state => ({
  app: state.App,
}))
class EmailVerified extends Component {
  state = {
    file: null,
    token: getURLSearchParams(this.props.location.search, 't'),
  }

  componentWillMount = () => {
    const { dispatch } = this.props;
    const { token } = this.state;

    dispatch(Auth.tokenDecode(token));
  }

  onClickHandler = () => {
    const { history } = this.props;

    return history.push('/login');
  }

  onFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  }

  onFileUpload = () => {
    const { dispatch } = this.props;
    const { file, token } = this.state;

    if (!file) return false;

    return dispatch(Auth.uploadProfileImage(file, token));
  }

  renderLoader = () => {
    const { app } = this.props;

    if (app.isLoading) {
      return <Loader />;
    }

    return null;
  }

  render() {
    return (
      <StyledDiv>
        <StyledText>Your email has been verified</StyledText>
        <StyledText>Please upload your profile picture</StyledText>
        <input
          type="file"
          accept="image/*"
          onChange={this.onFileChange}
        />
        <Button onClick={this.onFileUpload} className="button">Upload</Button>
        <Button onClick={this.onClickHandler} className="button">LOGIN</Button>
        {this.renderLoader()}
      </StyledDiv>
    );
  }
}

export default EmailVerified;

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .button {
    width: 50%;
    margin-top: 20px;
  }
`;

const StyledText = styled.div`
  font-size: 24px;
`;
