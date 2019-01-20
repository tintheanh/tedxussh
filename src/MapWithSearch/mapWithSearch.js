import React from 'react';
import { isNumber } from 'util';
import { relative } from 'path';

const _ = require('lodash');
const { compose, withProps, lifecycle } = require('recompose');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require('react-google-maps');
const {
  SearchBox
} = require('react-google-maps/lib/components/places/SearchBox');

const MapWithSearch = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyD0vm0l85I8sXbIj2s7WxxoCImg1fjXDgw&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ width: '100%', height: '100%' }} />,
    containerElement: <div style={{ height: '400px', width: '100%' }} />,
    mapElement: <div style={{ width: '100%', height: '100%' }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: 41.9,
          lng: -87.624
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = _.get(
            nextMarkers,
            '0.position',
            this.state.center
          );

          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });
          refs.map.fitBounds(bounds);
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  if (isNumber(props.lat) && isNumber(props.lng)) {
    return (
      <div style={{ position: 'relative', top: '-8px' }}>
        <GoogleMap
          ref={props.onMapMounted}
          defaultZoom={15}
          center={{ lat: props.lat, lng: props.lng }}
        >
          <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Enter location"
              style={{
                background: '#fff',
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '240px',
                height: '32px',
                marginTop: '27px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses'
              }}
            />
          </SearchBox>
          <Marker position={{ lat: props.lat, lng: props.lng }} />
          {props.markers.map((marker, index) => {
            if (marker !== undefined) {
              // props.setNewLocation(marker.position.lat(), marker.position.lng());
              return <Marker key={index} position={marker.position} />;
            }
          })}
        </GoogleMap>
        <button
          type="button"
          onClick={() => {
            const latlng = {
              lat: props.markers[0].position.lat(),
              lng: props.markers[0].position.lng()
            };
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: latlng }, (results, status) => {
              if (status === 'OK') {
                if (results[0]) {
                  props.setNewLocation(
                    props.markers[0].position.lat(),
                    props.markers[0].position.lng(),
                    results[0].formatted_address
                  );
                } else {
                  alert('No results found');
                }
              } else {
                alert('Geocoder failed');
              }
            });
            props.closeModal();
          }}
        >
          Save
        </button>
        <button type="button" onClick={() => props.closeModal()}>
          Cancel
        </button>
      </div>
    );
  }
  return null;
});

export default MapWithSearch;
