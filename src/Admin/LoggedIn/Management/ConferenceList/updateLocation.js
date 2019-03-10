import React from 'react'
import Modal from 'react-responsive-modal'
import MapView from '../../../../MapView/mapView'
import { updateData } from '../../../../config/firebase'
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

  renderSpeaker(startIndex, endIndex, speakers) {
    return speakers.slice(startIndex, endIndex).map(e => (
      <div className="col-3" key={e.id}>
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.picture} className="img-fluid notransition" alt="" />
          </div>
          <div className="hotel-room-body">
            <div>
              <h3 className="heading mb-0">{e.name}</h3>
              <strong className="price">{e.occupation}</strong>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  renderSpeakerRow(totalRows, speakers) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderSpeaker(startIndex, endIndex, speakers)}
        </div>
      )
    })
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
    const { locationData } = this.state
    return (
      <div className="row style-section-pictures">
        <div className="col-12">
          <h3>Location</h3>
        </div>
        {!this.state.toggle ? (
          <div className="col-12">
            <div>
              <p>{this.props.locationData.address}</p>
            </div>
            <div>
              <button onClick={() => this.setState({ toggle: true })}>Edit</button>
            </div>
          </div>
        ) : (
          <div className="col-12">
            <div>
              <input type="text" value={locationData.address} onChange={e => this.onAddressChange(e)} />
            </div>
            <div>
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
          </div>
        )}

        <div className="col-12">
          <MapView
            location={this.props.locationData}
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0vm0l85I8sXbIj2s7WxxoCImg1fjXDgw&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ width: '100%', height: '100%' }} />}
            containerElement={<div style={{ height: '400px', width: '100%' }} />}
            mapElement={<div style={{ width: '100%', height: '100%' }} />}
          />
        </div>
        <div className="col-12">
          <button onClick={() => this.setState({ modal: true })}>Edit speakers ...</button>
        </div>
        <Modal open={this.state.modal} onClose={() => this.setState({ modal: false })} center>
          <EditLocation location={this.props.locationData} closeModal={() => this.setState({ modal: false })} />
        </Modal>
      </div>
    )
  }
}
