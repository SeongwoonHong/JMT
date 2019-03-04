import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'constants';
import animate from 'gsap-promise';

class Comment extends Component {
  // componentDidMount = () => {
  //   const { shouldAnimate } = this.props;
  //
  //   shouldAnimate && animate.set(this.component, { autoAlpha: 0, x: '-80px' });
  // };
  //
  // componentWillUnmount = () => {
  //   TweenMax.killTweensOf(this.component);
  // };
  //
  // componentWillEnter = (done) => {
  //   this.animateIn().then(done);
  // };
  //
  // componentWillAppear = (done) => {
  //   this.animateIn().then(done);
  // };
  //
  // animateIn = () => {
  //   return animate.to(this.component, 0.5, {
  //     autoAlpha: 1,
  //     x: '0px',
  //     delay: this.props.delay
  //   });
  // };

  render() {
    const {
      user, message, avatar = 'https://www.w3schools.com/howto/img_avatar.png', date
    } = this.props.data;

    const { isSmallView } = this.props;

    return (
      <React.Fragment>
        <StyledComment
          depth={this.props.data.depth}
          innerRef={el => (this.component = el)}
          isSmallView={isSmallView}
        >
          <StyledLeft>
            <StyledImage img={avatar} isSmallView={isSmallView} />
          </StyledLeft>
          <StyledRight isSmallView={isSmallView}>
            <StyledTopText>
              <StyledRating isSmallView={isSmallView}>{user}</StyledRating>
              {/* <StyledDesc isSmallView={isSmallView}>{price || 'N/A'}</StyledDesc> */}
            </StyledTopText>
            <StyledMiddleText isSmallView={isSmallView}>
              {message}
            </StyledMiddleText>
            <StyledBottomText isSmallView={isSmallView}>{date}</StyledBottomText>
          </StyledRight>
        </StyledComment>
        {this.props.replies && this.props.replies.map((reply) => {
          const replyData = this.props.comments.find((comment) => comment.id === reply);
          return (
            <Comment
              comments={this.props.comments}
              replies={replyData.children || []}
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
  margin-left: ${props => props.depth ? (props.depth + 1) * 20 : 20}px !important;
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
  padding: 10px;

  ${props =>
    props.isSmallView &&
    css`
      padding: 0;
    `};
`;

const StyledImage = styled.div`
  background-image: url('${props => props.img}');
  background-size: cover;
  background-repeat: no-repeat;
  width: 90px;
  height: 90px;
  border-radius: 15px;
  margin: 10px;

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
