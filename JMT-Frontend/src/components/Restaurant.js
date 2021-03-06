import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'constants';
import animate from 'gsap-promise';

class Restaurant extends Component {
  componentDidMount = () => {
    const { shouldAnimate } = this.props;

    shouldAnimate && animate.set(this.component, { autoAlpha: 0, x: '-80px' });
  }

  componentWillUnmount = () => {
    TweenMax.killTweensOf(this.component);
  }

  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }

  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }

  animateIn = () => {
    return animate.to(this.component, 0.5, {
      autoAlpha: 1,
      x: '0px',
      delay: this.props.delay
    });
  }

  render() {
    const { onClick } = this.props;
    const {
      name,
      id,
      image_url: imageUrl,
      // review_count,
      rating,
      location: { address1 },
      distance,
      price,
    } = this.props.data;

    const { isSmallView } = this.props;

    return (
      <StyledRestaurant
        innerRef={el => this.component = el}
        onClick={() => onClick(id)}
        isSmallView={isSmallView}
      >
        <StyledLeft>
          <StyledImage img={imageUrl} isSmallView={isSmallView} />
        </StyledLeft>
        <StyledRight isSmallView={isSmallView}>
          <StyledTopText>
            <StyledRating isSmallView={isSmallView}>{rating}</StyledRating>
            <StyledDesc isSmallView={isSmallView}>{ price || 'N/A' }</StyledDesc>
          </StyledTopText>
          <StyledMiddleText isSmallView={isSmallView}>{name}</StyledMiddleText>
          <StyledBottomText isSmallView={isSmallView}>{distance.toFixed(0)}M {address1}</StyledBottomText>
        </StyledRight>
      </StyledRestaurant>
    );
  }
}

const StyledRestaurant = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  margin: 20px auto;
  cursor: pointer;

  ${props =>
    props.isSmallView &&
    css`
      margin: 0 auto;
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
      padding: 0
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

  ${props =>
    props.isSmallView &&
    css`
      font-size: 14px;
      white-space: nowrap;
    `};
`;

const StyledBottomText = styled.div`
  margin: 10px 0 10px 0;

  ${props =>
    props.isSmallView &&
    css`
      font-size: 11px;
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

const StyledDesc = styled.div`
  font-size: 14px;
  color: ${colors.black};

  ${props =>
    props.isSmallView &&
    css`
      font-size: 12px;
    `};
`;

export default Restaurant;
