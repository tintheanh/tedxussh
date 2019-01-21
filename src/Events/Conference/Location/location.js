import React from 'react';
import MapView from '../../../MapView/mapView';

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    return (
      <div className="site-section location" style={{ padding: '0' }}>
        <div
          className="row"
          style={{ width: '100%', padding: '0', margin: '0' }}
        >
          <MapView
            lat={this.props.lat}
            lng={this.props.lng}
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0vm0l85I8sXbIj2s7WxxoCImg1fjXDgw&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ width: '100%', height: '100%' }} />}
            containerElement={
              <div
                style={{
                  height: this.state.width <= 686 ? '380px' : '680px',
                  width: '100%'
                }}
              />
            }
            mapElement={<div style={{ width: '100%', height: '100%' }} />}
          />
          <div className="bg-light venue-section text-vertical-center">
            <div className="text-center section-heading">
              <h2 style={{ fontFamily: 'Oswald', marginBottom: '36px' }}>
                Venue
              </h2>
            </div>
            <p className="venue-address text-center">{this.props.address}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
