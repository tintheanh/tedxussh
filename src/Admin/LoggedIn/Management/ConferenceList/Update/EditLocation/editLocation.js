import React from 'react'
import MapWithSearch from 'utils/components/MapWithSearch'
import { updateData } from 'config/firebase'

const setNewLocation = (lat, lng, address) => {
  const update = {
    overview: {
      location: {
        address,
        lat,
        lng
      }
    }
  }
  updateData('conference', update).catch(err => alert(err.message))
}

const EditLocation = props => {
  const { location, closeModal } = props
  return (
    <div style={{ width: '600px' }}>
      <MapWithSearch
        lat={location.lat}
        lng={location.lng}
        loadingElement={<div style={{ width: '100%', height: '100%' }} />}
        containerElement={<div style={{ width: '100%', height: '100%' }} />}
        mapElement={<div style={{ width: '100%', height: '100%' }} />}
        setNewLocation={setNewLocation.bind(this)}
        closeModal={closeModal}
      />
    </div>
  )
}

export default EditLocation
