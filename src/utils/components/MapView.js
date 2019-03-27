import React from 'react'
import {
  GoogleMap, Marker, withGoogleMap, withScriptjs
} from 'react-google-maps'

const MapView = withScriptjs(
  withGoogleMap(props => {
    const { location } = props
    return (
      <GoogleMap defaultZoom={18} center={{ lat: location.lat, lng: location.lng }}>
        {props.isMarkerShown && <Marker position={{ lat: location.lat, lng: location.lng }} />}
      </GoogleMap>
    )
  })
)
export default MapView
