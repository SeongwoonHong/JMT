import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'utils/colors';
import animate from 'gsap-promise';

class Restaurant extends Component {
  componentDidMount = () => {
    animate.set(this.component, { autoAlpha: 0, x: '-80px' });
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
    // const { name, rating, vicinity } = this.props.restaurant; // for google api
    const {
      name,
      id,
      image_url: imageUrl,
      review_count,
      rating,
      location: { address1 },
      distance,
      price,
    } = this.props.data;

    const { isSmallView } = this.props;

    return (
      <StyledRestaurant innerRef={el => this.component = el}>
        <StyledLeft>
          <StyledImage img={imageUrl} isSmallView={isSmallView} />
        </StyledLeft>
        <StyledRight>
          <StyledTopText>
            <StyledRating isSmallView={isSmallView}>{rating}</StyledRating>
            <StyledDesc isSmallView={isSmallView}>{ price || '??' }</StyledDesc>
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
`;

const StyledLeft = styled.div`
  display: inline-block;
`;

const StyledRight = styled.div`
  width: 75%;
  display: inline-block;
  padding: 10px;
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
