import React, { Component } from 'react';
import styled from 'styled-components';
import { Restaurant } from 'actions';
import { connect } from 'react-redux';
import Loader from 'components/Loader';
import phoneIcon from 'assets/phoneIcon.png';
import { colors } from 'utils/colors';
import RatingCircle from 'components/RatingCircle';

import Map from './Map';
import ImageSlide from './ImageSlide';
import Categories from './Categories';

@connect(state => ({
  restaurants: state.Restaurants,
  app: state.App,
}))
class RestaurantDetail extends Component {
  constructor(props) {
    super(props);

    const { location } = this.props;
    const params = new URLSearchParams(location.search);

    this.state = {
      imageIndex: 0,
      id: params.get('id'),
    };
  }

  componentWillMount = () => {
    const { dispatch } = this.props;
    const { id } = this.state;

    return dispatch(Restaurant.getRestaurantDetail(id));
  }

  getHours = () => {
    const { hours } = this.props.restaurants.activeRestaurant;
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const day = currentDay === 0 ? 6 : currentDay - 1;
    const hoursObj = hours[0].open[day];

    return `${this.getTimeWithPeriod(hoursObj.start)} - ${this.getTimeWithPeriod(hoursObj.end)}`;
  }

  getTimeWithPeriod = (time) => {
    let result = '';
    const num = typeof time === 'string' ? Number(time) : time;

    if (num > 1200) {
      result += `${this.getNumberWithHourAndMinutes(num - 1200)}pm`;
    } else {
      result += `${this.getNumberWithHourAndMinutes(num)}am`;
    }

    return result;
  }

  getNumberWithHourAndMinutes = (number) => {
    const hours = number / 100;
    const minutes = number % 100;

    if (minutes) {
      return `${hours.toFixed(0)}.${minutes}`;
    }

    return hours.toFixed(0);
  }

  /**
   * @param {array} address
   */
  getAddress = (address) => {
    return address.reduce((acc, value) => `${acc + value} `, '');
  }

  increaseIndex = () => {
    return this.setState({ imageIndex: this.state.imageIndex + 1 });
  }

  decreaseIndex = () => {
    return this.setState({ imageIndex: this.state.imageIndex - 1 });
  }

  render() {
    const { restaurants, app } = this.props;
    const { imageIndex } = this.state;

    if (!Object.keys(restaurants.activeRestaurant).length) return null;

    if (app.isLoading) {
      return <Loader />;
    }

    const {
      display_phone: displayPhone,
      coordinates,
      categories,
      location: {
        display_address: address,
      },
      photos,
      hours,
      price,
      review_count: reviewCount,
      name,
      rating,
    } = restaurants.activeRestaurant;

    console.log('restaurants.activeRestaurant = ', restaurants.activeRestaurant);
    return (
      <StyledRestaurantDetail>
        <StyledImageSlideWrapper>
          <ImageSlide
            images={photos}
            currentIndex={imageIndex}
          />
          <Categories
            categories={categories}
            className="categories-container"
          />
        </StyledImageSlideWrapper>
        <StyledBottom>
          <StyledArrowLeft onClick={this.decreaseIndex} isHide={imageIndex === 0} />
          <StyledArrowRight onClick={this.increaseIndex} isHide={imageIndex === photos.length - 1} />
          <StyledBottomTopInfo>
            <StyledRatingNumber>{rating}</StyledRatingNumber>
            <RatingCircle
              rating={rating}
              style={{ verticalAlign: 'baseline' }}
            />
            <StyledReviewNumber>{reviewCount} Reviews</StyledReviewNumber>
            <StyledPriceDistanceWrapper>
              <StyledPrice>{price}</StyledPrice>
              <StyledDistance>350 m</StyledDistance> {/* this value is hard coded for now.. */}
            </StyledPriceDistanceWrapper>
          </StyledBottomTopInfo>
          <StyledRestaurantName>{name}</StyledRestaurantName>
          <StyledRestaurantAddress>{this.getAddress(address)}</StyledRestaurantAddress>
          <StyledHorizontalBorders>
            <StyledWrapperLeft>
              <StyledRestaurantStatus>{hours && hours[0].is_open_now ? 'OPEN NOW' : 'CLOSE NOW'}</StyledRestaurantStatus>
              <StyledRestaurantOpenTime>{this.getHours()}</StyledRestaurantOpenTime>
            </StyledWrapperLeft>
            <StyledVerticalBorder />
            <StyledWrapperRight>
              <StyledPhoneIcon>
                <img src={phoneIcon} alt="" />
              </StyledPhoneIcon>
              <StyledCall>CALL</StyledCall>
              <StyledRestaurantNumber>{displayPhone}</StyledRestaurantNumber>
            </StyledWrapperRight>
          </StyledHorizontalBorders>
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC50Sb3U7clyt4_TT36sj40NIXdTUaQc_E" // this key can be exposed
            loadingElement={<Loader />}
            containerElement={<div style={{ height: '200px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            restaurant={restaurants.activeRestaurant}
            lat={Number(coordinates.latitude)} // by default, it's toronto downtown
            lng={Number(coordinates.longitude)} // by default, it's toronto downtown
          />
        </StyledBottom>
      </StyledRestaurantDetail>
    );
  }
}

export default RestaurantDetail;

const StyledRestaurantDetail = styled.div`

`;

const StyledImageSlideWrapper = styled.div`
  position: relative;
  height: 250px;

  .categories-container {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
`;

const StyledBottom = styled.div`
  padding: 10px;
`;

const StyledBottomTopInfo = styled.div`
  position: relative;
`;

const StyledRatingNumber = styled.span`
  color: ${colors.lightTheme};
  font-size: 25px;
  margin-right: 10px;
`;

const StyledArrowLeft = styled.span`
  display: ${props => props.isHide ? 'none' : 'inline-block'};
  width: 0;
  height: 0;
  border: 0 solid transparent;
  border-top-width: 8px;
  border-bottom-width: 7px;
  border-right: 15px solid ${colors.theme};
  margin-right: 5px;
`;

const StyledArrowRight = styled.span`
  display: ${props => props.isHide ? 'none' : 'inline-block'};
  width: 0;
  height: 0;
  border: 0 solid transparent;
  border-bottom-width: 8px;
  border-top-width: 7px;
  border-left: 15px solid ${colors.theme};
`;

const StyledReviewNumber = styled.span`
  color: rgb(94, 94, 94);
  font-size: 14px;
  margin-left: 10px;
`;

const StyledPriceDistanceWrapper = styled.span`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledPrice = styled.span`
  margin-right: 10px;
`;

const StyledDistance = styled.div`
  display: inline-block;
  width: 53px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid rgb(189, 189, 189);
  padding: 2px 8px;
`;

const StyledRestaurantName = styled.div`
  color: black;
  font-size: 19px;
  font-weight: bold;
`;

const StyledRestaurantAddress = styled.div`
  padding: 4px 0 0;
  color: ${colors.black};
  font-size: 14px;
`;

const StyledHorizontalBorders = styled.div`
  margin: 20px 0;
  width: 95%;
  height: 60px;
  border-top: solid 1px rgb(222,222,222);
  border-bottom: solid 1px rgb(222,222,222);
`;

const StyledWrapperLeft = styled.div`
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

const StyledRestaurantStatus = styled.div`
  padding: 12px 0 2px;
  font-size: 10px;
  color: ${colors.lightTheme};
  font-weight: bold;
`;

const StyledRestaurantOpenTime = styled.div`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 300;
`;

const StyledWrapperRight = styled.div`
  float:left;
  padding: 0 0 0 17px;
  width:50%;
  height:60px;
  display: inline;
`;

const StyledCall = styled.div`
  padding: 12px 0 2px;
  font-size: 10px;
  color: ${colors.lightGrey};
  font-weight: bold;
`;

const StyledRestaurantNumber = styled.div`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 300;
`;

const StyledPhoneIcon = styled.div`
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

