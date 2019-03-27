import React from 'react'
import Modal from 'react-responsive-modal'
import MapView from '../../../../../MapView/mapView'
import { updateData } from 'config/firebase'
import EditLocation from './EditLocation/editLocation'

export default class UpdateLocation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationData: this.props.locationData,
      toggle: false,
      modal: false
    }
  }

  onAddressChange(e) {
    const locationData = {
      ...this.state.locationData,
      address: e.target.value
    }
    this.setState({ locationData })
  }

  onUpdate() {
    const update = {
      overview: {
        location: {
          address: this.state.locationData.address
        }
      }
    }
    updateData('conference', update).catch(err => alert(err.message))
  }

  render() {
    const { locationData } = this.props
    return (
      <div className="col-12">
        {!this.state.toggle ? (
          <div>
            <p>{locationData.address}</p>
            <button onClick={() => this.setState({ toggle: true })}>Edit</button>
          </div>
        ) : (
          <div>
            <input type="text" defaultValue={locationData.address} onChange={e => this.onAddressChange(e)} />
            <button
              onClick={() => {
                this.onUpdate()
                this.setState({ toggle: false })
              }}
            >
              Save
            </button>
            <button
              onClick={() =>
                this.setState({
                  toggle: false,
                  locationData: this.props.locationData
                })
              }
            >
              Cancel
            </button>
          </div>
        )}

        <MapView
          location={locationData}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0vm0l85I8sXbIj2s7WxxoCImg1fjXDgw&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ width: '100%', height: '100%' }} />}
          containerElement={<div style={{ height: '400px', width: '100%' }} />}
          mapElement={<div style={{ width: '100%', height: '100%' }} />}
        />
        <button onClick={() => this.setState({ modal: true })}>Edit</button>
        <Modal open={this.state.modal} onClose={() => this.setState({ modal: false })} center>
          <EditLocation location={this.props.locationData} closeModal={() => this.setState({ modal: false })} />
        </Modal>
      </div>
    )
  }
}
