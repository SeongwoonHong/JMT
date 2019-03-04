import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { colors } from 'constants';
import { Loader } from 'components';
import Comments from './Comments';

@connect(state => ({
  app: state.App
}))
class CommentList extends React.Component {

  render() {
    const { app } = this.props;

    if (app.isLoading) {
      return <Loader />;
    }

    return (
      <StyledDiv>
        <StyledHeader>Group Chat</StyledHeader>
        <Comments comments={this.props.comments} />
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  margin: 0 10px;
`;

const StyledHeader = styled.div`
  font-size: 25px;
  margin-top: 10px;
  padding-top: 10px;
  text-align: center;
  color: ${colors.black};
  background-color: ${colors.lightPink};
`;

export default CommentList;
