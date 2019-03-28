import React from 'react'
import {
  GoogleMap, Marker, withGoogleMap, withScriptjs
} from 'react-google-maps'

const MapView = withScriptjs(
  withGoogleMap(props => {
    const { lat, lng } = props
    return (
      <GoogleMap defaultZoom={18} center={{ lat, lng }}>
        {props.isMarkerShown && <Marker position={{ lat, lng }} />}
      </GoogleMap>
    )
  })
)
export default MapView
