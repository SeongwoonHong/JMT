import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'utils/colors';
import animate from 'gsap-promise';

class Comment extends Component {
  componentDidMount = () => {
    const { shouldAnimate } = this.props;

    shouldAnimate && animate.set(this.component, { autoAlpha: 0, x: '-80px' });
  };

  componentWillUnmount = () => {
    TweenMax.killTweensOf(this.component);
  };

  componentWillEnter = (done) => {
    this.animateIn().then(done);
  };

  componentWillAppear = (done) => {
    this.animateIn().then(done);
  };

  animateIn = () => {
    return animate.to(this.component, 0.5, {
      autoAlpha: 1,
      x: '0px',
      delay: this.props.delay
    });
  };

  render() {
    const {
      user, comment, avatar, date
    } = this.props.data;

    const { isSmallView } = this.props;

    return (
      <StyledComment
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
            {comment}
          </StyledMiddleText>
          <StyledBottomText isSmallView={isSmallView}>{date}</StyledBottomText>
        </StyledRight>
      </StyledComment>
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
