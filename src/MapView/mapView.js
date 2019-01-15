import React from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps';
import { isNumber } from 'util';

const MapView = withScriptjs(
  withGoogleMap(props => {
    if (isNumber(props.lat) && isNumber(props.lng)) {
      return (
        <GoogleMap
          defaultZoom={18}
          center={{ lat: props.lat, lng: props.lng }}
        >
          {props.isMarkerShown && (
            <Marker position={{ lat: props.lat, lng: props.lng }} />
          )}
        </GoogleMap>
      );
    }
    return null;
  })
);
export default MapView;
