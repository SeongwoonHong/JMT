import React, { Component } from 'react';
import styled from 'styled-components';
import { Restaurant } from 'actions';
import { connect } from 'react-redux';
import phoneIcon from 'assets/phoneIcon.png';
import { colors } from 'utils/colors';
import { RatingCircle, Loader, Arrow, Button, ModalTitle } from 'components';
import { getTimeWithPeriod } from 'utils/number-format';
import history from 'utils/history';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';

import Map from './Map';
import ImageSlide from './ImageSlide';
import Categories from './Categories';

const modalStyles = {
  content: {
    top: '80px',
    left: '20px',
    right: '20px',
    bottom: '225px'
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
    return this.setState({ isModalOpen: true });
  }

  saveDate = () => {
    const { scheduleDate } = this.state;
    if (!scheduleDate) return false;

    const timeStamp = +scheduleDate.getTime();

    // TODO: call an action creator to save

    console.log('timeStamp = ', timeStamp);

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
            dateFormat="MMMM d, yyyy h:mm aa"
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

    return (
      <StyledRestaurantDetail>
        <StyledImageSlideWrapper>
          <Arrow
            className="arrow-container left"
            onClick={this.goToRestaurantList}
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
    top: 15px;
    left: 15px;
    z-index: 1;
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

