import React, { Component } from 'react';
import { GoogleMap as GMap, Marker, InfoWindow } from 'react-google-maps';

import Restaurant from './Restaurant'; // later, this Restaurant component should be separated as a generic component in the component folder

class GoogleMap extends Component {
  render() {
    const {
      lat,
      lng,
      defaultZoom,
      onMarkerClick,
      markers,
      toggleInfoWindow,
      onZoomChanged,
      onCenterChanged,
    } = this.props;

    return (
      <GMap
        defaultZoom={defaultZoom}
        defaultCenter={{ lat, lng }}
        onZoomChanged={onZoomChanged}
        onCenterChanged={onCenterChanged}
        ref={el => this.googleMapRef = el}
      >
        {
          markers.map((marker) => {
            return (
              <Marker
                position={marker} // this marker is an object that has lat and lnt for position
                onClick={() => onMarkerClick(marker.key)}
                key={marker.key}
                animation={google.maps.Animation.DROP}
              >
                {
                  marker.isInfoWindowShown &&
                  <InfoWindow onCloseClick={() => toggleInfoWindow(marker.key)}>
                    <Restaurant
                      data={marker}
                      isSmallView
                    />
                  </InfoWindow>
                }
              </Marker>
            );
          })
        }
      </GMap>
    );
  }
}

export default GoogleMap;
