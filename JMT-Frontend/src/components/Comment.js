import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'constants';

class Comment extends Component {
  render() {
    const {
      id,
      user,
      message,
      avatar = 'https://www.w3schools.com/howto/img_avatar.png',
      date,
      displayName
    } = this.props.data;

    const { isSmallView } = this.props;

    return (
      <React.Fragment>
        <StyledComment
          id={`comments-${id}`}
          depth={this.props.data.depth}
          innerRef={el => (this.component = el)}
          isSmallView={isSmallView}
        >
          <StyledLeft>
            <StyledAvatar
              onClick={() => {
                this.props.onCommentReply(this.props.data);
              }}
            >
              <StyledImage img={avatar} isSmallView={isSmallView} />
              <span>{displayName}</span>
            </StyledAvatar>
          </StyledLeft>
          <StyledRight isSmallView={isSmallView}>
            <StyledTopText>
              <StyledRating isSmallView={isSmallView}>{user}</StyledRating>
            </StyledTopText>
            <StyledMiddleText isSmallView={isSmallView}>
              {displayName.length > 0 ? <strong>@{displayName}</strong> : null}
              <p>{message}</p>
            </StyledMiddleText>
            <StyledBottomText isSmallView={isSmallView}>
              {date}
            </StyledBottomText>
          </StyledRight>
        </StyledComment>
        {this.props.replies &&
          this.props.replies.map((reply) => {
            const replyData = this.props.comments.find(
              comment => comment.id === reply
            );
            return (
              <Comment
                comments={this.props.comments}
                replies={replyData.children || []}
                isSmallView={isSmallView}
                onCommentReply={this.props.onCommentReply}
                key={replyData.id}
                data={replyData}
              />
            );
          })}
      </React.Fragment>
    );
  }
}

const StyledComment = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  margin: 20px auto;
  margin-left: ${props => (props.depth ? 40 : 0)}px !important;
  opacity: 1 !important;

  ${props =>
    props.isSmallView &&
    css`
      margin: 10px auto;
    `};
`;

const StyledLeft = styled.div`
  display: inline-block;
`;

const StyledRight = styled.div`
  width: 75%;
  display: inline-block;
  padding-left: 10px;
`;

const StyledAvatar = styled.div`
  > span {
    display: block;
    font-size: 12px;
    margin: 0 5px 5px;
  }
`;

const StyledImage = styled.div`
  background-image: url('${props => props.img}');
  background-size: cover;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  margin: 10px 10px 5px;

  ${props =>
    props.isSmallView &&
    css`
      width: 50px;
      height: 50px;
    `};
`;

const StyledTopText = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const StyledMiddleText = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
  word-break: break-all;
  > p {
    margin-top: 5px;
  }

  ${props =>
    props.isSmallView &&
    css`
      font-size: 14px;
      word-break: break-all;
    `};
`;

const StyledBottomText = styled.div`
  margin: 10px 0 10px 0;
  font-size: 10px;
  color: gray;

  ${props =>
    props.isSmallView &&
    css`
      font-size: 9px;
      color: grey;
    `};
`;

const StyledRating = styled.div`
  color: ${colors.theme};
  font-size: 20px;

  ${props =>
    props.isSmallView &&
    css`
      font-size: 14px;
    `};
`;

export default Comment;
