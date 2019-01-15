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
        containerElement={<div style={{ height: '680px', width: '100%' }} />}
        mapElement={<div style={{ width: '100%', height: '100%' }} />}
      />
      <div className="bg-light venue-section">
        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
          <h2
            className="venue-title mb-5"
            style={{ fontFamily: 'Roboto', marginTop: '92px' }}
          >
            Venue
          </h2>
        </div>
        <p
          className="venue-address text-center"
        >
          {props.address}
        </p>
      </div>
    </div>
  </div>
);

export default Location;
