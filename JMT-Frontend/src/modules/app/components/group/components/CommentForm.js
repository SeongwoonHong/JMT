import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Group } from 'actions';
import { Loader, InputTextField, Button } from 'components';
import { withCookies } from 'react-cookie';
import inputValidator from 'utils/input-validator';
import { colors } from 'constants';

@withRouter
@withCookies
@connect(state => ({
  app: state.App
}))
class CommentForm extends Component {

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      targetCommentUser: props.targetCommentUser || ''
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      targetCommentUser: '',
      comment: '',
      errorMessages: {}
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler = ({ target: { value: comment } }) => {
    this.setState({ comment });
  };

  onKeyDown(e) {
    if (e.which === 13 && this.state.comment.length > 0) {
      this.props.onSubmit(this.state.comment);
    }
  }

  validateInputs = (comment) => {
    const errorMessages = {};

    if (inputValidator.isEmpty(comment)) {
      errorMessages.comment = 'Comment is required';
    }

    return errorMessages;
  };

  initializeErrorMessages = () => {
    return this.setState({ errorMessages: {} });
  };

  isInputValidationPassed(errorObject) {
    return Object.keys(errorObject).length === 0;
  }

  saveComment() {
    const { comment } = this.state;
    const errorMessages = this.validateInputs(comment);

    this.initializeErrorMessages();
    if (!this.isInputValidationPassed(errorMessages)) {
      return this.setState({ errorMessages });
    }

    return dispatch(Group.insertComment({ email, password }));
  }

  render() {
    const { app } = this.props;
    const { comment, errorMessages, targetCommentUser } = this.state;
    const label = targetCommentUser.length > 0
      ? `Enter your comment for @${targetCommentUser}`
      : 'Enter your comment';

    if (app.isLoading) {
      return <Loader />;
    }

    return (
      <StyledCommentContainer>
        <StyledInputWrapper>
          <InputTextField
            label={label}
            name="comment"
            value={comment}
            onKeyDown={this.onKeyDown}
            onChange={this.onChangeHandler}
            hasError={errorMessages.comment}
          />
          {errorMessages.comment && (
            <StyledErrorMessage>{errorMessages.comment}</StyledErrorMessage>
          )}
        </StyledInputWrapper>
        <Button
          onClick={() => {
            if (this.state.comment.length > 0) {
              this.props.onSubmit(comment);
            }
          }}
          className="btn-save">
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
