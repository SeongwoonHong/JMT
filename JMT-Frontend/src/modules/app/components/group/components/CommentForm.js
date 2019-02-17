import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Group } from 'actions';
import { Loader, InputTextField, Button } from 'components';
import { withCookies, Cookies } from 'react-cookie';
import inputValidator from 'utils/input-validator';
// import history from 'utils/history';
import { colors } from 'utils/colors';

@withRouter
@withCookies
@connect(state => ({
  app: state.App
}))
class CommentForm extends Component {
  state = {
    comment: '',
    errorMessages: {}
  };

  // componentWillMount = () => {
  //   if (this.getTokenFromCookie()) {
  //     return history.push('/');
  //   }

  //   return false;
  // };

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    return this.setState({ [name]: value });
  };

  getTokenFromCookie = () => {
    const cookies = new Cookies();
    const token = cookies.get('JMT_AUTH_TOKEN');

    return token;
  };

  saveComment = () => {
    // const { dispatch, location: { state } } = this.props;
    const { comment } = this.state;
    const errorMessages = this.validateInputs(comment);
    // let reRoute = '/';

    this.initializeErrorMessages();
    if (!this.isInputValidationPassed(errorMessages)) {
      return this.setState({ errorMessages });
    }

    // if (state) {
    //   reRoute = state.prevRoute;
    // }

    return dispatch(Group.insertComment({ email, password }));
    // return true;
  };

  isInputValidationPassed = (errorObject) => {
    return Object.keys(errorObject).length === 0;
  };

  initializeErrorMessages = () => {
    return this.setState({ errorMessages: {} });
  };

  validateInputs = (comment) => {
    const errorMessages = {};

    if (inputValidator.isEmpty(comment)) {
      errorMessages.comment = 'Comment is required';
    }

    return errorMessages;
  };

  render() {
    const { app } = this.props;
    const { comment, errorMessages } = this.state;

    if (app.isLoading) {
      return <Loader />;
    }

    return (
      <StyledCommentContainer>
        <StyledInputWrapper>
          <InputTextField
            label="Enter your comment"
            name="comment"
            value={comment}
            onChange={this.onChangeHandler}
            hasError={errorMessages.comment}
          />
          {errorMessages.comment && (
            <StyledErrorMessage>{errorMessages.comment}</StyledErrorMessage>
          )}
        </StyledInputWrapper>
        <Button onClick={this.saveComment} className="btn-save">
          Save
        </Button>
      </StyledCommentContainer>
    );
  }
}

export default CommentForm;

const StyledCommentContainer = styled.div`
  padding: 15px;

  .btn-save {
    margin-top: 15px;
  }
`;

const StyledInputWrapper = styled.div`
  position: relative;
  margin-top: 10px;
`;

const StyledErrorMessage = styled.div`
  color: ${colors.theme};
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  font-size: 12px;
`;
