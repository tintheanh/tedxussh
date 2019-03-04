import React from 'react'
import Modal from 'react-responsive-modal'
import EditHosts from './EditHosts/editHosts'
import { updateData } from '../../../../config/firebase'

export default class UpdateSpeakers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hostData: this.props.hostData,
      toggle: false,
      modal: false
    }
  }

  renderHost(startIndex, endIndex, hosts) {
    return hosts.slice(startIndex, endIndex).map(e => (
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

  renderHostRow(totalRows, hosts) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderHost(startIndex, endIndex, hosts)}
        </div>
      )
    })
  }

  onDescriptionChange(e) {
    const hostData = {
      ...this.state.hostData,
      description: e.target.value
    }
    this.setState({ hostData })
  }

  onUpdate() {
    const update = {
      hosts: {
        description: this.state.hostData.description
      }
    }
    updateData('conference', update).catch(err => alert(err.message))
  }

  render() {
    const { hostData } = this.state
    return (
      <div className="row style-section-pictures">
        <div className="col-12">
          <h3>Hosts</h3>
        </div>
        {!this.state.toggle ? (
          <div className="col-12">
            <div>
              <p>{hostData.description}</p>
            </div>
            <div>
              <button onClick={() => this.setState({ toggle: true })}>Edit</button>
            </div>
          </div>
        ) : (
          <div className="col-12">
            <div>
              <textarea value={hostData.description} onChange={e => this.onDescriptionChange(e)} />
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
                    hostData: this.props.hostData
                  })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="col-12">{this.renderHostRow(1, this.props.hostData.hostList)}</div>
        <div className="col-12">
          <button onClick={() => this.setState({ modal: true })}>Edit hosts ...</button>
        </div>
        <Modal open={this.state.modal} onClose={() => this.setState({ modal: false })} center>
          <EditHosts hosts={this.props.hostData.hostList} closeModal={() => this.setState({ modal: false })} />
        </Modal>
      </div>
    )
  }
}
