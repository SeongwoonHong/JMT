import React, { Component } from 'react';
import styled from 'styled-components';
import { Restaurant } from 'actions';
import { connect } from 'react-redux';
import phoneIcon from 'assets/phoneIcon.png';
import { colors } from 'utils/colors';
import { RatingCircle, Loader, Arrow, Button, ModalTitle } from 'components';
import { getTimeWithPeriod, convertDateObject } from 'utils/date-utils';
import history from 'utils/history';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

import Map from './Map';
import ImageSlide from './ImageSlide';
import Categories from './Categories';

const modalStyles = {
  content: {
    top: '9vh',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '19vh',
    width: '82vw'
  },
  overlay: {
    opacity: 1,
    backgroundColor: colors.backgroundOverlay,
    zIndex: 2,
  },
};

@connect(state => ({
  restaurants: state.Restaurants,
  app: state.App,
  user: state.Auth.user,
}))
class RestaurantDetail extends Component {
  constructor(props) {
    super(props);

    const { location } = this.props;
    const params = new URLSearchParams(location.search);

    this.state = {
      imageIndex: 0,
      id: params.get('id'),
      scheduleDate: null,
      isModalOpen: false,
    };
  }

  componentWillMount = () => {
    const { dispatch } = this.props;
    const { id } = this.state;

    return dispatch(Restaurant.getRestaurantDetail(id));
  }

  /**
   * returns a time string
   * ex) '1.30pm - 2.30am', '6pm - 9.30pm'
   */
  getHours = () => {
    const { hours } = this.props.restaurants.activeRestaurant;
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const day = currentDay === 0 ? 6 : currentDay - 1;

    if (!hours) {
      return 'N/A';
    }

    const hoursObj = hours[0].open[day];

    if (!hoursObj) {
      return '';
    }

    return `${getTimeWithPeriod(hoursObj.start)} - ${getTimeWithPeriod(hoursObj.end)}`;
  }

  /**
   * @param {array} address
   */
  getAddress = (address) => {
    return address.reduce((acc, value) => `${acc + value} `, '');
  }

  getDistance = () => {
    const { distance } = this.props.restaurants.activeRestaurant;

    if (distance) {
      return `${distance.toFixed(0)} m`;
    }

    return 'N/A';
  }

  increaseIndex = () => {
    return this.setState({ imageIndex: this.state.imageIndex + 1 });
  }

  decreaseIndex = () => {
    return this.setState({ imageIndex: this.state.imageIndex - 1 });
  }

  goToRestaurantList = () => {
    return history.goBack();
  }

  handleDateChange = (scheduleDate) => {
    return this.setState({ scheduleDate });
  }

  closeModal = () => {
    return this.setState({ isModalOpen: false });
  }

  openModal = () => {
    const { user } = this.props;

    if (!user) {
      return toast.info('You need to login to join');
    }

    return this.setState({ isModalOpen: true });
  }

  saveDate = () => {
    const { scheduleDate } = this.state;
    const { dispatch, user, restaurants } = this.props;

    if (!scheduleDate) return false;

    const convertedScheduleDate = convertDateObject(scheduleDate);

    dispatch(Restaurant.joinRestaurant(user.userId, restaurants.activeRestaurant.id, convertedScheduleDate));

    return false;
  }

  renderModal = () => {
    const { scheduleDate } = this.state;

    return (
      <Modal
        isOpen={this.state.isModalOpen}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <ModalTitle modalClose={this.closeModal} title="Select a Date" />
        <div style={{ marginTop: '50px' }}>
          <DatePicker
            selected={scheduleDate}
            onChange={this.handleDateChange}
            placeholderText="select a date and time"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="YYYY-MM-dd, h:mm aa"
            timeCaption="time"
          />
        </div>
        <Button style={{ marginTop: '20px' }} onClick={this.saveDate}>Save</Button>
      </Modal>
    );
  }

  render() {
    const { restaurants, app } = this.props;
    const { imageIndex } = this.state;

    if (app.isLoading || !Object.keys(restaurants.activeRestaurant).length) {
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

    return (
      <StyledRestaurantDetail>
        <StyledImageSlideWrapper>
          <Arrow
            className="arrow-container left"
            onClick={this.decreaseIndex}
            isHide={imageIndex === 0}
          />
          <Arrow
            className="arrow-container right"
            onClick={this.increaseIndex}
            isHide={imageIndex === photos.length - 1}
          />
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
          <StyledBottomTopInfo>
            <StyledRatingNumber>{rating}</StyledRatingNumber>
            <RatingCircle
              rating={rating}
              style={{ verticalAlign: 'baseline' }}
            />
            <StyledReviewNumber>{reviewCount} Reviews</StyledReviewNumber>
            <StyledPriceDistanceWrapper>
              <StyledPrice>{price}</StyledPrice>
              <StyledDistance>{this.getDistance()}</StyledDistance>
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

          <Button
            onClick={this.openModal}
            className="btn-restaurant-detail"
          >
            Join
          </Button>
          <StyledHr />
          {this.renderModal()}
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
  .btn-restaurant-detail {
    margin: 10px 0px;
  }
`;

const StyledImageSlideWrapper = styled.div`
  position: relative;
  height: 250px;

  .categories-container {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  .arrow-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

    &.left {
      left: 10px;
    }

    &.right {
      right: 10px;
    }
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

const StyledReviewNumber = styled.span`
  color: rgb(94, 94, 94);
  font-size: 14px;
  margin-left: 10px;
`;

const StyledPriceDistanceWrapper = styled.span`
  position: absolute;
  right: 0;
  top: 0;
`;

const StyledPrice = styled.span`
  margin-right: 10px;
  width: 55px;
  display: inline-block;
  text-align: right;
`;

const StyledDistance = styled.div`
  display: inline-block;
  width: 63px;
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
  width: 100%;
  height: 60px;
  border-top: solid 1px rgb(222,222,222);
  border-bottom: solid 1px rgb(222,222,222);
`;

const StyledHr = styled.hr`
  border: solid 1px rgb(222,222,222);
  margin-bottom: 10px;
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
  color: ${colors.grey};
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

