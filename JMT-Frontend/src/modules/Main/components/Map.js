import React, { Component } from 'react';
import { withGoogleMap, withScriptjs } from 'react-google-maps';
import { connect } from 'react-redux';
import { GoogleMap as GoogleMapAction } from 'actions';

import GoogleMap from 'components/GoogleMap';

class Map extends Component {
  state = {
    markers: [],
  }

  componentDidMount = () => {
    this.getMapMarkerData(this.props.restaurants);
  }

  componentWillReceiveProps = (nextProps) => {
    if (JSON.stringify(this.props.restaurants) !== JSON.stringify(nextProps.restaurants)) {
      return this.getMapMarkerData(nextProps.restaurants);
    }

    return null;
  }

  onMarkerClick = (key) => {
    return this.toggleInfoWindow(key);
  }

  onZoomChanged = () => {
    const { dispatch } = this.props;
    const zoomLevel = this.mapRef.googleMapRef.getZoom();

    return dispatch(GoogleMapAction.setDefaultZoom(zoomLevel));
  }

  onCenterChanged = () => {
    const { dispatch } = this.props;
    const center = this.mapRef.googleMapRef.getCenter();

    return dispatch(GoogleMapAction.setCenter({
      lat: center.lat(),
      lng: center.lng(),
    }));
  }

  getMapMarkerData = (restaurants) => {
    const markers = restaurants.map((restaurant, index) => {
      const {
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

      return ({
        lat: latitude,
        lng: longitude,
        key: index,
        name,
        rating,
        image_url,
        price,
        phone,
        location,
        distance,
        isInfoWindowShown: false,
      });
    });

    return this.setState({ markers });
  }

  toggleInfoWindow = (key) => {
    return this.setState({
      markers: this.state.markers.map((marker) => {
        if (key === marker.key) {
          return {
            ...marker,
            isInfoWindowShown: !marker.isInfoWindowShown,
          };
        }

        return {
          ...marker,
          isInfoWindowShown: false,
        };
      })
    });
  }

  render() {
    const { lat, lng } = this.props;
    const { defaultZoom, center } = this.props.googleMapSettings;
    const { markers } = this.state;

    return (
      <GoogleMap
        lat={center.lat || lat} // once a user moves center coordination, it uses the values from redux, otherwise use props
        lng={center.lng || lng} // once a user moves center coordination, it uses the values from redux, otherwise use props
        markers={markers}
        defaultZoom={defaultZoom}
        onMarkerClick={this.onMarkerClick}
        toggleInfoWindow={this.toggleInfoWindow}
        onZoomChanged={this.onZoomChanged}
        onCenterChanged={this.onCenterChanged}
        ref={el => this.mapRef = el}
      />
    );
  }
}

export default connect((state => ({
  googleMapSettings: state.GoogleMap.settings,
})))(withScriptjs(withGoogleMap(Map)));
