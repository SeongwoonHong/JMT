import React, { Component } from 'react';
import styled from 'styled-components';
import logo from 'assets/phoneIcon.png';

class RestaurantDetails extends Component {
  render() {
    return (
      <WrapperAll>
        <StyledRestaurantName>Laterna Dining Room</StyledRestaurantName>
        <StyledRestaurantAddress>6301 Yonge St, North York, ON M2M 3X7</StyledRestaurantAddress>
        <StyledHorizontalBorders>
          <WrapperLeft>
            <StyledRestaurantStatus>OPEN NOW</StyledRestaurantStatus>
            <StyledRestaurantOpenTime>3pm - 10:30pm</StyledRestaurantOpenTime>
          </WrapperLeft>
          <StyledVerticalBorder></StyledVerticalBorder>
          <WrapperRight>
            <PhoneIcon><img src={logo} alt="phoneicon"/>
            </PhoneIcon>
            <StyledCall>CALL</StyledCall>
            <StyledRestaurantNumber>(416) 221-2501</StyledRestaurantNumber>
          </WrapperRight>
        </StyledHorizontalBorders>
      </WrapperAll>
    );
  }
}


export default RestaurantDetails;

const WrapperAll = styled.div `
padding: 10px 0 0 18px;
`;
const StyledRestaurantName = styled.div `
  color: black;
  font-size: 19px;
  letter-spacing: -0.32px;
  font-weight: bolder;
  font-family: "Open Sans";
`;
const StyledRestaurantAddress = styled.div `
  padding: 4px 0 0;
  color: black;
  font-size: 14px;
  letter-spacing: -0.3px;
  font-family: "Open Sans";
`;

const StyledHorizontalBorders = styled.div `
  margin: 20px 0;
  width: 95%;
  height: 60px;
  border-top: solid 1px rgb(222,222,222);
  border-bottom: solid 1px rgb(222,222,222);
`;

const WrapperLeft = styled.div `
  float:left;
  width:44%;
  height: 60px;
  display: inline;
`;

const StyledVerticalBorder = styled.div`
  float: left;
  border-right: solid 2px rgb(222,222,222);
  width: 1px;
  height: 60px;
  display: inline-block;
`;

const StyledRestaurantStatus = styled.div `
  padding: 12px 0 2px;
  font-size: 10px;
  color: rgb(246,86,65);
  font-weight: bold;
  font-family: "Open Sans";
`;
const StyledRestaurantOpenTime = styled.div `
  color: black;
  font-size: 14px;
  font-weight: 300;
  font-family: "Open Sans";
`;
const WrapperRight = styled.div `
  float:left;
  padding: 0 0 0 17px;
  width:50%;
  height:60px;
  display: inline;
`;
const StyledCall = styled.div `
  padding: 12px 0 2px;
  font-size: 10px;
  color: rgb(168,168,168);
  font-weight: bold;
  font-family: "Open Sans";
`;
const StyledRestaurantNumber = styled.div `
  color: black;
  font-size: 14px;
  font-weight: 300;
  font-family: "Open Sans";
`;

const PhoneIcon = styled.div`
  width:39px;
  height:39px;
  float: right;
  margin: 10px 0 0;
  border: solid 1px rgb(222,222,222);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
