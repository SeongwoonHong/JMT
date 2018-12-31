import React, { Component } from 'react';
import { withGoogleMap, withScriptjs } from 'react-google-maps';
import { GoogleMap } from 'components';

@withScriptjs
@withGoogleMap
class Map extends Component {
  state = {
    markers: [],
  }

  componentDidMount = () => {
    this.getMapMarkerData(this.props.restaurant);
  }

  /**
   * @param {object} restaurant
   * setting a restaurant object into a markers state that will be passed to GoogleMap component
   */
  getMapMarkerData = (restaurant) => {
    const {
      id,
      name,
      image_url,
      rating,
      price,
      phone,
      location,
      distance,
      coordinates: {
        latitude,
        longitude
      },
    } = restaurant;

    const marker = {
      lat: latitude,
      lng: longitude,
      key: id,
      name,
      rating,
      image_url,
      price,
      phone,
      location,
      distance,
      isInfoWindowShown: false,
    };

    return this.setState({
      markers: [
        ...this.state.markers,
        marker,
      ]
    });
  }

  render() {
    const { lat, lng } = this.props;
    const { markers } = this.state;

    return (
      <GoogleMap
        lat={lat} // once a user moves center coordination, it uses the values from redux, otherwise use props
        lng={lng} // once a user moves center coordination, it uses the values from redux, otherwise use props
        markers={markers}
        defaultZoom={15}
        toggleInfoWindow={this.toggleInfoWindow}
        onZoomChanged={this.onZoomChanged}
        onCenterChanged={this.onCenterChanged}
        options={{ gestureHandling: 'greedy' }}
        ref={el => this.mapRef = el}
      />
    );
  }
}

export default Map;
