import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';

class Restaurant extends Component {
  render() {
    // const { name, rating, vicinity } = this.props.restaurant; // for google api
    const { name, id, image_url: imageUrl, review_count, rating, location: { address1 }, distance, price } = this.props.restaurant;

    return (
      <StyledRestaurant>
        <StyledLeft>
          <StyledImage img={imageUrl} />
        </StyledLeft>
        <StyledRight>
          <StyledTopText>
            <StyledRating>{rating}</StyledRating>
            <StyledDesc>{ price || '??' }</StyledDesc>
          </StyledTopText>
          <StyledMiddleText>{name}</StyledMiddleText>
          <StyledBottomText>{distance.toFixed(0)} {address1}</StyledBottomText>
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
`;

const StyledBottomText = styled.div`
  margin: 10px 0 10px 0;
`;

const StyledRating = styled.div`
  color: ${colors.theme};
  font-size: 20px;
`;

const StyledDesc = styled.div`
  font-size: 14px;
  color: ${colors.black};
`;

export default Restaurant;
