import React from 'react';
import MapView from '../../../MapView/mapView';

const Location = props => (
  <div className="site-section" style={{ padding: '0' }}>
    <div className="row" style={{ width: '100%', padding: '0', margin: '0' }}>
      <MapView
        lat={props.lat}
        lng={props.lng}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0vm0l85I8sXbIj2s7WxxoCImg1fjXDgw&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ width: '100%', height: '100%' }} />}
        containerElement={<div style={{ height: '400px', width: '100%' }} />}
        mapElement={<div style={{ width: '100%', height: '100%' }} />}
      />
      <div
        className="bg-light"
        style={{
          position: 'absolute',
          left: '100px',
          marginTop: '50px',
          width: '20%',
          height: '300px'
        }}
      >
        <h1 className="text-center">Venue</h1>
        <p className="text-center">{props.address}</p>
      </div>
    </div>
  </div>
);

export default Location;
